import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-avatar-photo",
  templateUrl: "./avatar-photo.component.html",
  styleUrls: ["./avatar-photo.component.scss"],
})
export class AvatarPhotoComponent implements OnInit {

  @Input() public photoUrl!: string;
  @Input() public name!: string;

  public showInitials: boolean = false;
  public initials: string = "";
  public circleColor: string = "";
  private colors: string[] = [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
  ];

  constructor() {}

  ngOnInit(): void {
    if(!this.photoUrl) {
      this.showInitials = true;
      this.createInitials();
      const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
      this.circleColor = this.colors[randomIndex];
    }
  }

  private createInitials(): void {
    let inizials = "";

    for (let i = 0; i < this.name.length; i++) {
      if (this.name.charAt(i) === " ") {
        continue;
      }

     if (this.name.charAt(i) === this.name.charAt(i).toUpperCase()) {
        inizials += this.name.charAt(i);
      }

      if (inizials.length === 2) {
        break;
      }
  }
  this.initials = inizials;
}

}
