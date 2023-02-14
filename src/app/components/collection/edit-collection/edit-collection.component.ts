import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.scss']
})
export class EditCollectionComponent implements OnInit{

  editCollectionForm!: FormGroup;
  collectionId!: number;


  constructor(
    private formBuilder: FormBuilder,
    private collectionService: CollectionService,
    private route : ActivatedRoute
  ) { }


  ngOnInit(): void {

    this.collectionId = this.route.snapshot.params['collectionId'];

    this.editCollectionForm = this.formBuilder.group({
      name: [""],
      type: [""],
      visible: [false],
    });
  }

  getCurrentCollection() {

    this.collectionService.getPublicCollectionById(this.collectionId).subscribe(
      (data) => {
        this.editCollectionForm.patchValue({
          name: data.name,
          type: data.type,
          visible: data.visible
        });
      }
    );
  }

  onSubmit() {
    //send the data to the service
    this.collectionService.editCollection(this.collectionId, this.editCollectionForm.value).subscribe(
      (data) => {
        console.log(data);
      }

    );

  }



}
