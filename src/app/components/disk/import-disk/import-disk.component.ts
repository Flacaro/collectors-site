import { AfterViewInit, Component, Inject, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatStepper } from "@angular/material/stepper";
import { BehaviorSubject, combineLatest, filter, map, Observable, of, startWith, Subject, switchMap } from "rxjs";
import { Disk } from "src/app/models/disk";
import { Select } from "src/app/models/select";
import { SearchService } from "src/app/services/search.service";

@Component({
  selector: "app-import-disk",
  templateUrl: "./import-disk.component.html",
  styleUrls: ["./import-disk.component.scss"],
})
export class ImportDiskComponent implements OnInit {

  @ViewChild("stepper") stepper!: MatStepper;

  selectedSearchResult$ = new BehaviorSubject<Disk | null>(null);
  results$!: Observable<any>;
  private mostSearchedDisks$ = new BehaviorSubject<Disk[]>([]);

  searchControl: FormControl = new FormControl("");

  searchStepControl: FormControl = new FormControl();
  diskStepControl: FormControl = new FormControl();

  addDiskForm!: FormGroup;

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
    { string: "dvd", viewValue: "DVD" }
  ];

  constructor(
    private searchService: SearchService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: Disk[]
  ) {}


  ngOnInit(): void {
    this.mostSearchedDisks$.next(this.data);

    this.addDiskForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      artist: ["", [Validators.required]],
      year: [0, [Validators.required, Validators.min(1800)]],
      genre: ["", [Validators.required]],
      author: ["", [Validators.required]],
      label: ["", [Validators.required]],
      band: ["", [Validators.required]],
      state: ["", [Validators.required]],
      duplicate: [0],
      format: ["", [Validators.required]],
      barcode: [null, [Validators.min(1000)]],
    });



    this.selectedSearchResult$.asObservable().subscribe(disk => {
      if(disk !== null) {
        this.addDiskForm.patchValue({...disk});
        this.addDiskForm.updateValueAndValidity();
        this.stepper.next();
      }      
    })

    const search$ = this.searchControl.valueChanges.pipe(startWith(""));

    this.results$ = combineLatest([search$, this.mostSearchedDisks$]).pipe(
      switchMap(([search, mostSearchedDisks]) => {
        if (search === "") {
          return of(mostSearchedDisks);
        } else {
          return this.searchService.searchDisk(search);
        }
      })
    );

  }


  setSelectedResult(disk: Disk) {
    this.selectedSearchResult$.next(disk);
  }



}
