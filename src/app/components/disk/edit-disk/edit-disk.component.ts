import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Disk } from "src/app/models/disk";
import { Select } from "src/app/models/select";
import { CollectionService } from "src/app/services/collection.service";
import { DiskService } from "src/app/services/disk.service";

@Component({
  selector: "app-edit-disk",
  templateUrl: "./edit-disk.component.html",
  styleUrls: ["./edit-disk.component.scss"],
})
export class EditDiskComponent implements OnInit {
  editDiskForm!: FormGroup;
  diskId!: number;
  collectionId!: number;
  disk$!: Observable<Disk>;

  selectValues: Select[] = [
    { string: "buono", viewValue: "Buono" },
    { string: "ottimo", viewValue: "Ottimo" },
    { string: "discreto", viewValue: "Discreto" },
  ];

  genre: Select[] = [
    { string: "rock", viewValue: "Rock" },
    { string: "pop", viewValue: "Pop" },
    { string: "jazz", viewValue: "Jazz" },
    { string: "blues", viewValue: "Blues" },
    { string: "metal", viewValue: "Metal" },
    { string: "punk rock", viewValue: "Punk Rock" },
    { string: "hip-hop", viewValue: "Hip-Hop" },
    { string: "reggae", viewValue: "Reggae" },
    { string: "country", viewValue: "Country" },
    { string: "classica", viewValue: "Classica" },
    { string: "soul", viewValue: "Soul" },
    { string: "disco", viewValue: "Disco" },
    { string: "funk", viewValue: "Funk" },
    { string: "indie", viewValue: "Indie" },
    { string: "electronic", viewValue: "Electronic" },
    { string: "alternative", viewValue: "Alternative" },
    { string: "folk", viewValue: "Folk" },
    { string: "rap", viewValue: "Rap" },
    { string: "ska", viewValue: "Ska" },
    { string: "new wave", viewValue: "New Wave" },
    { string: "hard rock", viewValue: "Hard Rock" },
    { string: "heavy metal", viewValue: "Heavy Metal" },
    { string: "progressive rock", viewValue: "Progressive Rock" },
    { string: "psychedelic rock", viewValue: "Psychedelic Rock" },
  ];

  format: Select[] = [
    { string: "vinile", viewValue: "Vinile" },
    { string: "cd", viewValue: "CD" },
    { string: "cassette", viewValue: "Cassette" },
    { string: "dvd", viewValue: "DVD" },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private diskService: DiskService,
    private route: ActivatedRoute,
    private router: Router,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.diskId = this.route.snapshot.params["diskId"];

    this.collectionId = this.route.snapshot.params["collectionId"];

    this.editDiskForm = this.formBuilder.group({
      title: [""],
      artist: [""],
      year: [""],
      genre: [""],
      author: [""],
      label: [""],
      band: [""],
      state: [""],
      duplicate: [""],
      format: [""],
      barcode: [""],
    });

    this.disk$ = this.diskService.getPersonalDiskById(
      this.collectionId,
      this.diskId
    );

    this.disk$.subscribe((disk) => {
      this.editDiskForm.patchValue({
        title: disk.title,
        artist: disk.artist,
        year: disk.year,
        genre: disk.genre,
        author: disk.author,
        label: disk.label,
        band: disk.band,
        state: disk.state,
        duplicate: disk.duplicate,
        format: disk.format,
        barcode: disk.barcode,
      });
    });
  }

  onSubmit() {
    this.diskService
      .editPersonalDisk(this.collectionId, this.diskId, this.editDiskForm.value)
      .subscribe();
    this.router.navigate(["../"], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }
}
