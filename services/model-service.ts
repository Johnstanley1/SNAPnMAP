import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService{
  constructor() {
  }
}

export class Photo{
  id: number| undefined;
  name: string;
  imageDataUrl: string; // Save images as their DataURL
  dateCaptured: string;
  dateAdded: string;
  tags: string[];
  favourite: boolean;
  hidden: boolean;
  tagId: number

  constructor(name: string, dataUrl: string, dateCaptured: string, dateAdded: string,tags: string[],
              favourite: boolean, hidden: boolean, tagId: number ) {
    this.name = name
    this.imageDataUrl = dataUrl
    this.dateCaptured = dateCaptured
    this.dateAdded = dateAdded
    this.tags = tags
    this.favourite = favourite
    this.hidden = hidden
    this.tagId = tagId
  }
}

export class Tag{
  id: number | undefined
  name: string

  constructor(name: string) {
    this.name = name
  }

}

export class Collection{
  id: number|undefined
  name: string
  thumbnailPhoto: string // save thumbnail photo as DataURL
  photos: Photo[]
  dateCreated: string
  description: string

  constructor(name: string, thumbnailPhoto: string, photos: Photo[], dateCreated: string, description: string) {
    this.name = name
    this.thumbnailPhoto = thumbnailPhoto
    this.photos = photos
    this.dateCreated = dateCreated
    this.description = description
  }
}
