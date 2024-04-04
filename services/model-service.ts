import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService{
  constructor() {
  }
}

export class Photo{
  name: string;
  photo: Photo;
  dateCaptured: Date = new Date();
  dateAdded: Date = new Date();
  tags: string[];
  favourite: boolean;
  hidden: boolean;
  tagId: number

  constructor(name: string, photo: Photo, dateCaptured: Date, dateAdded: Date,
        tags: string[], favourite: boolean, hidden: boolean, tagId: number ) {
    this.name = name
    this.photo = photo
    this.dateCaptured = dateCaptured
    this.dateAdded = dateAdded
    this.tags = tags
    this.favourite = favourite
    this.hidden = hidden
    this.tagId = tagId
  }
}

export class Tag{
  id: number
  name: string

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }

}

export class Collection{
  name: string
  thumbnailPhotos: Photo[]
  dateCreated: Date = new Date()
  description: string

  constructor(name: string, thumbnailPhotos: Photo[], dateCreated: Date, description: string) {
    this.name = name
    this.thumbnailPhotos = thumbnailPhotos
    this.dateCreated = dateCreated
    this.description = description
  }
}
