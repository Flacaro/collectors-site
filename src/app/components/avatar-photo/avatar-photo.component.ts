import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-avatar-photo",
  templateUrl: "./avatar-photo.component.html",
  styleUrls: ["./avatar-photo.component.scss"],
})
export class AvatarPhotoComponent implements OnInit {

  @Input() public photoUrl!: string;

  constructor() {}

  ngOnInit(): void {}
}
