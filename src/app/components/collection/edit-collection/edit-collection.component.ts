import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable } from 'rxjs';
import { Collection } from 'src/app/models/collection';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.scss']
})
export class EditCollectionComponent implements OnInit{

  editCollectionForm!: FormGroup;
  collectionId!: number;
  collection$!: Observable<Collection>;




  constructor(
    private formBuilder: FormBuilder,
    private collectionService: CollectionService,
    private route : ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.collectionId = this.route.snapshot.params['collectionId'];

    this.collection$ = this.collectionService.getPersonalCollectionById(this.collectionId);

    

    this.editCollectionForm = this.formBuilder.group({
      name: [""],
      type: [""],
      visible: [""],
    });

    this.collection$.subscribe((collection) => {
      this.editCollectionForm.patchValue({
        name: collection.name,
        type: collection.type,
        visible: collection.visible,
      });
    }
    );

    
    
  }


  onSubmit() {
  
    this.collectionService.editCollection(this.collectionId, this.editCollectionForm.value).subscribe();

    this.router.navigate(['../'], {relativeTo: this.route});

  }

}
