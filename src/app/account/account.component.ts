import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { User } from 'firebase/auth';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updateProfile } from 'firebase/auth';
import firebase from "firebase/compat/app";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  orders: any[] = [];

  currentUser: User | null;
  name: string | null;
  email: string | null;
  password: string;
  closeResult = '';
  newEmail: string | null;
  newUsername: string | null;
  newEmailPassword: string | null;

  constructor(private auth: AuthenticationService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.auth.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.name = user!.displayName;
      this.email = user!.email;
      this.getOrders(); // add this line
    });
  }

  open(content) {
    this.newEmail = this.email; // initialize newEmail with the current email
    this.newUsername = this.name; // initialize newUsername with the current username
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateAccount() {
    const credential = EmailAuthProvider.credential(this.currentUser!.email!, this.newEmailPassword!);

    // Reauthenticate the user with their current password
    reauthenticateWithCredential(this.currentUser!, credential).then(() => {
      // Update the email and username of the user
      updateEmail(this.currentUser!, this.newEmail!)
        .then(() => {
          this.email = this.newEmail; // Update the email in the component
        })
        .catch((error) => {
          console.log(error.message);
        });
      updateProfile(this.currentUser!, { displayName: this.newUsername })
        .then(() => {
          this.name = this.newUsername; // Update the username in the component
        })
        .catch((error) => {
          console.log(error.message);
        });
    }).catch((error) => {
      console.log(error.message);
    });
  }

  getOrders() {
    const db = firebase.firestore();
    const ordersRef = db.collection('orders');
    ordersRef.where('account.ID', '==', this.currentUser?.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.orders.push(doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting orders: ", error);
      });
  }
}
