import { inject, Injectable } from '@angular/core';
import {DatabaseService} from "./database-service";
import {Collection, Photo, Tag} from "./model-service";

@Injectable({
  providedIn: 'root'
})

export class DALService {

    // Inject databaseService into the datatype provided:
    database = inject(DatabaseService);

    constructor() {

    }


  // *****************************
  // Photo Crud Operations
  // *****************************

  // Used on AddPhoto
  insertPhoto(photo: Photo): Promise<any> {
      // Create a new promise
      return new Promise( (resolve, reject) => {
        // Create a new transaction:
        const transaction = this.database.db.transaction(["photos"], "readwrite");

        // Handle outcomes:
        transaction.oncomplete = (event: any) => {
          console.log("[DAL] Success: Transaction Initialization");
        };

        transaction.onerror = (event: any) => {
          console.log("[DAL] Fail: Transaction Initialization");
        };

        // Create store param and attempt insertion:
        const photoStore = transaction.objectStore("photos");
        const request = photoStore.add(photo);

        // Handle Outcomes:
        request.onsuccess = (event: any) => {
          console.log("[DAL] Success: Insertion Request Accepted.");
          resolve(event.target.result);
        };

        request.onerror = (event: any) => {
          console.log("[DAL] Fail: Insertion Request Denied.");
          reject(event);
        };

      });
  };

  // Used on Photos
  selectAllPhotos(): Promise<Photo[]> {
    // Create a new promise
    return new Promise( (resolve, reject) => {
      // Create a new transaction (READONLY)
      const transaction = this.database.db.transaction(["photos"]);

      // Handle outcomes:
      transaction.oncomplete = (event: any) => {
        console.log("[DAL] Success: Transaction SelectAll Initialization");
      };

      transaction.onerror = (event: any) => {
        console.log("[DAL] Fail: Transaction SelectAll Initialization");
      };

      // Create photostore and attempt to get all:
      const photoStore = transaction.objectStore("photos");
      const request = photoStore.getAll();

      // Handle outcomes:
      request.onsuccess = (event: any) => {
        console.log("[DAL] Success: SelectAll Request Accepted.");
        resolve(event.target.result);
      };

      request.onerror = (event: any) => {
        console.log("[DAL] Fail: SelectAll Request Denied.");
        reject(event);
      };
    });
  };

  // Called when user clicks photo
  selectPhoto(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["photos"]);

      transaction.oncomplete = (event: any) => {
        console.log("[DAL] Success: Transaction Select Initialization");
      };
      transaction.onerror = (event: any) => {
        console.log("[DAL] Fail: Transaction SelectAll Initialization: " + event);
      };

      const photoStore = transaction.objectStore("photos");

      const request = photoStore.get(id);
      request.onsuccess = (event: any) => {
        // Lambda expression used to handle result with no matching ID:
        console.log("[DAL] Success: Select Request Accepted");
        event.target.result ? resolve(event.target.result) : resolve(null);
      };

      request.onerror = (event: any) => {
        console.log("[DAL] Fail: Select Request Denied");
        reject(event);
      };
    });
  }

  // Called when 'update' clicked
  updatePhoto(photo: Photo): Promise<any> {

    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["photos"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("[DAL] Success: Transaction Update Initialization");
      };
      transaction.onerror = (event: any) => {
        console.log("[DAL] Fail: Transaction Select Initialization: " + event);
      };

      const photoStore = transaction.objectStore("photos");

      const request = photoStore.put(photo);

      request.onsuccess = (event: any) => {
        console.log("[DAL] Success: Insert Request Accepted.");
        resolve(event);
      };

      request.onerror = (event: any) => {
        console.log("[DAL] Fail: Insert Request Denied:" + event);
        reject(event);
      };
    });
  }

  // Called when 'delete' clicked
  deletePhoto(photo: Photo): Promise<any> {

    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["photos"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("[DAL] Success: Transaction Delete Initialization");
      };
      transaction.onerror = (event: any) => {
        console.log("[DAL] Fail: Transaction Delete Initialization: " + event);
      };

      const photoStore = transaction.objectStore("photos");
      if (photo.id) {
        const request = photoStore.delete(photo.id);

        request.onsuccess = (event: any) => {
          console.log("[DAL] Success: Delete Request Accepted.");
          resolve(event);
        };
        request.onerror = (event: any) => {
          console.log("[DAL] Fail: Delete Request Denied: " + event);
          reject(event);
        };
      } else {
        reject("Photo Does Not Posses An ID.")
      }

    });
  }

  // Setting Page function
  deleteAllPhotos(): Promise<any> {

    return new Promise( (resolve, reject) => {
      const transaction = this.database.db.transaction(["photos"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("[DAL] Success: Transaction DeleteAll Initialization");
      };
      transaction.onerror = (event: any) => {
        console.log("[DAL] Fail: Transaction DeleteAll Initialization: " + event);
      };

      const photoStore = transaction.objectStore("photos");
      const request = photoStore.clear();

      request.onsuccess = (event: any) => {
        console.log("[DAL] Success: DeleteAll Request Accepted.");
        resolve(event);
      }

      request.onerror = (event: any) => {
        console.log("[DAL] Success: DeleteAll Request Denied: " + event);
        reject(event);
      }
    })
  }



  // *****************************
  // Collection Crud Operations
  // *****************************

  // Used on AddCollection
  insertCollection(collection: Collection): Promise<any> {
// Create a new promise
    return new Promise( (resolve, reject) => {
      // Create a new transaction:
      const transaction = this.database.db.transaction(["collections"], "readwrite");

      // Handle outcomes:
      transaction.oncomplete = (event: any) => {
        console.log("[DAL] Success: Transaction Initialization");
      };

      transaction.onerror = (event: any) => {
        console.log("[DAL] Fail: Transaction Initialization");
      };

      // Create store param and attempt insertion:
      const collectionStore = transaction.objectStore("collections");
      const request = collectionStore.add(collection);

      // Handle Outcomes:
      request.onsuccess = (event: any) => {
        console.log("[DAL] Success: Insertion Request Accepted.");
        resolve(event.target.result);
      };

      request.onerror = (event: any) => {
        console.log("[DAL] Fail: Insertion Request Denied.");
        reject(event);
      };

    });
  }

  // Used on Collections List
  selectAllCollections(): Promise<Collection[]> {
    // Create a new promise
    return new Promise( (resolve, reject) => {
      // Create a new transaction (READONLY)
      const transaction = this.database.db.transaction(["collections"]);

      // Handle outcomes:
      transaction.oncomplete = (event: any) => {
        console.log("[DAL] Success: Transaction SelectAll Initialization");
      };

      transaction.onerror = (event: any) => {
        console.log("[DAL] Fail: Transaction SelectAll Initialization");
      };

      // Create collectionStore and attempt to get all:
      const collectionStore = transaction.objectStore("collections");
      const request = collectionStore.getAll();

      // Handle outcomes:
      request.onsuccess = (event: any) => {
        console.log("[DAL] Success: SelectAll Request Accepted.");
        resolve(event.target.result);
      };

      request.onerror = (event: any) => {
        console.log("[DAL] Fail: SelectAll Request Denied.");
        reject(event);
      };
    });
  }

  // Called when user clicks collection
  selectCollection(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["collections"]);

      transaction.oncomplete = (event: any) => {
        console.log("[DAL] Success: Transaction Select Initialization");
      };
      transaction.onerror = (event: any) => {
        console.log("[DAL] Fail: Transaction SelectAll Initialization: " + event);
      };

      const collectionStore = transaction.objectStore("collections");

      const request = collectionStore.get(id);

      request.onsuccess = (event: any) => {
        // Lambda expression used to handle result with no matching ID:
        console.log("[DAL] Success: Select Request Accepted");
        event.target.result ? resolve(event.target.result) : resolve(null);
      };

      request.onerror = (event: any) => {
        console.log("[DAL] Fail: Select Request Denied");
        reject(event);
      };
    });
  }

  // Called when 'updateCollection' clicked
  updateCollection(collection: Collection): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["collections"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("[DAL] Success: Transaction Update Initialization");
      };
      transaction.onerror = (event: any) => {
        console.log("[DAL] Fail: Transaction Select Initialization: " + event);
      };

      const collectionStore = transaction.objectStore("collections");

      const request = collectionStore.put(collection);

      request.onsuccess = (event: any) => {
        console.log("[DAL] Success: Insert Request Accepted.");
        resolve(event);
      };

      request.onerror = (event: any) => {
        console.log("[DAL] Fail: Insert Request Denied:" + event);
        reject(event);
      };
    });
  }

  // Called when 'deleteCollection' clicked
  deleteCollection(collection: Collection): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["collections"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("[DAL] Success: Transaction Delete Initialization");
      };
      transaction.onerror = (event: any) => {
        console.log("[DAL] Fail: Transaction Delete Initialization: " + event);
      };

      const collectionStore = transaction.objectStore("collections");

      if (collection.id) {
        const request = collectionStore.delete(collection.id);

        request.onsuccess = (event: any) => {
          console.log("[DAL] Success: Delete Request Accepted.");
          resolve(event);
        };
        request.onerror = (event: any) => {
          console.log("[DAL] Fail: Delete Request Denied: " + event);
          reject(event);
        };
      } else {
        reject("Collection Does Not Posses An ID.")
      }

    });
  }

  // Setting Page function
  deleteAllCollections(): Promise<any> {
    return new Promise( (resolve, reject) => {
      const transaction = this.database.db.transaction(["collections"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("[DAL] Success: Transaction DeleteAll Initialization");
      };
      transaction.onerror = (event: any) => {
        console.log("[DAL] Fail: Transaction DeleteAll Initialization: " + event);
      };

      const collectionStore = transaction.objectStore("collections");
      const request = collectionStore.clear();

      request.onsuccess = (event: any) => {
        console.log("[DAL] Success: DeleteAll Request Accepted.");
        resolve(event);
      }

      request.onerror = (event: any) => {
        console.log("[DAL] Success: DeleteAll Request Denied: " + event);
        reject(event);
      }
    })
  }

  addPhotoToCollection(collectionId: number, photo: Photo): Promise<any> {
    return new Promise( (resolve, reject) => {

      // Get transaction table
      const transaction = this.database.db.transaction(["collections"], "readwrite");

      // Handle outcomes:
      transaction.oncomplete = (event: any) => {
        console.log("[DAL] Success: AddPhotoToCollection Transaction.");
      };
      transaction.onerror = (event: any) => {
        console.log("[DAL] Fail: AddPhotoToCollection Transaction: " + event);
      };

      // Create store and get the collection via ID:
      const collectionStore = transaction.objectStore("collections");
      const request = collectionStore.get(collectionId);

      request.onsuccess = (event: any) => {
        // Create new collection using the event passed:
        const collection = event.target.result;

        // Check if event is a collection
        if(collection){
          // Check if the list of photos is initialized:
          if(!collection.photos){
            collection.photos = [];
          }

          console.log("[DAL] Info: Adding Photo to Collection...");
          // Add photo to collection photo array:
          collection.photos.push(photo);

          // Make a new request and update collection:
          const updateCollectionRequest = collectionStore.put(collection);

          updateCollectionRequest.onsuccess = (event: any) => {
            console.log("[DAL] Success: Photo Added to Collection.");
            resolve(event);
          };

          updateCollectionRequest.onerror = (event: any) => {
            console.log("[DAL] Fail: Failed to Add Photo to Collection: " + event);
            // Reject promise:
            reject(updateCollectionRequest.target.error);
          };
        }else{
          console.log("[DAL] Fail: No Corresponding ID Found in DB: " + collectionId);
          reject("No Collection Found.");
        }
      };

      request.onerror = (event: any) => {
        console.log("[DAL] Fail: Failed to Retrieve Collection: " + event.target.error);
        reject(event.target.error);
      };

    })
  }

  removePhotoFromCollection(collectionId: number, photoId: number): Promise<any> {

    // Return new promise
    return new Promise((resolve, reject) => {

      // Create transaction and assign a collectionStore
      const transaction = this.database.db.transaction(["collections"], "readwrite");
      const collectionStore = transaction.objectStore("collections");

      // Get the collection from the passed ID
      const getRequest = collectionStore.get(collectionId);

      // Handle outcomes:
      getRequest.onsuccess = (event: any) => {
        // Assign the collection to the event result:
        const collection = event.target.result;

        // Check if the collection has an initialized array of photos:
        if (collection && collection.photos) {

          // Filter the collection so that the corresponding id is removed:
          collection.photos = collection.photos.filter((photo: Photo) => photo.id !== photoId);

          // Update the collection inside DB:
          const updateRequest = collectionStore.put(collection, collectionId);

          // Handle outcomes:
          updateRequest.onsuccess = (updateEvent: any) => {
            alert("[DAL] Success: RemovePhotoFromCollection Request Accepted.");
            resolve(updateEvent.target.result);
          };

          updateRequest.onerror = (updateEvent: any) => {
            alert("[DAL] Fail: RemovePhotoFromCollection Request Denied: " + updateEvent);
            reject(updateEvent.target.error);
          };
        } else {
          alert("[DAL] Fail: Collection not Found or has no Photos");
          reject("Collection not found or has no photos");
        }
      };

      getRequest.onerror = (event: any) => {
        console.log("[DAL] Fail: Failed to Retrieve Collection: " + event);
        reject(event.target.error);
      };
    });
  }


  // *****************************
  // Tags Crud Operations
  // *****************************

  // Used on AddPhoto
  insertTag(tag: Tag): Promise<any> {
    // Create a new promise
    return new Promise( (resolve, reject) => {
      // Create a new transaction:
      const transaction = this.database.db.transaction(["tags"], "readwrite");

      // Handle outcomes:
      transaction.oncomplete = (event: any) => {
        console.log("[DAL] Success: Transaction Initialization");
      };

      transaction.onerror = (event: any) => {
        console.log("[DAL] Fail: Transaction Initialization");
      };

      // Create store param and attempt insertion:
      const tagStore = transaction.objectStore("tags");
      const request = tagStore.add(tag);

      // Handle Outcomes:
      request.onsuccess = (event: any) => {
        console.log("[DAL] Success: Insertion Request Accepted.");
        resolve(event.target.result);
      };

      request.onerror = (event: any) => {
        console.log("[DAL] Fail: Insertion Request Denied.");
        reject(event);
      };

    });
  };

  deleteTag(collection: Collection): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["collections"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("[DAL] Success: Transaction Delete Initialization");
      };
      transaction.onerror = (event: any) => {
        console.log("[DAL] Fail: Transaction Delete Initialization: " + event);
      };

      const collectionStore = transaction.objectStore("collections");

      if (collection.id) {
        const request = collectionStore.delete(collection.id);

        request.onsuccess = (event: any) => {
          console.log("[DAL] Success: Delete Request Accepted.");
          resolve(event);
        };
        request.onerror = (event: any) => {
          console.log("[DAL] Fail: Delete Request Denied: " + event);
          reject(event);
        };
      } else {
        reject("Collection Does Not Posses An ID.")
      }

    });
  }
}
