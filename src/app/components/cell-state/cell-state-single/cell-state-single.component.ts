import { Component, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { ImageInfos } from '../../../models/image-infos';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cell-state-single',
  templateUrl: './cell-state-single.component.html',
  styleUrl: './cell-state-single.component.css'
})
export class CellStateSingleComponent {
  @Input() imagesInfos: ImageInfos[] = [];
  @Input() currentImage: ImageInfos = this.imagesInfos[0];
  
  @Output() change_current_img = new EventEmitter<ImageInfos>();

  
  /** 
   * Function launched when an image is correctly loaded. We'll then set the isLoading and isError on true of the corresponding image 
   * 
   * Depending on whether the image is in portrait or landscape mode, we'll modify the variables to obtain an optimal display.
   */
  onLoadImg(img: ImageInfos, event: Event) {
    img.isLoading = false;
    img.isError = false;

    const imgElement = event.target as HTMLImageElement;
    const imgWidth = imgElement.naturalWidth;
    const imgHeight = imgElement.naturalHeight;

    if (imgWidth > imgHeight) {
        imgElement.style.width = '100%';
        imgElement.style.height = 'auto';   
    } else {
      imgElement.style.width = 'auto';
      imgElement.style.height = '100%';
    }
  }

  /** Function launched when there's an error loading the image. We'll then set the isLoading to False and isError on true of the corresponding image */
  onErrorImg(img: ImageInfos) {
    img.isLoading = false;
    img.isError = true;
  }

  /** Function to display the previous image in the list (if not already at the beginning). We'll also notify cell-state.component of the current image change. */
  previousImage(){
    const index = this.imagesInfos.indexOf(this.currentImage);
    if(index>0){
      this.currentImage = this.imagesInfos[index-1];
      this.change_current_img.emit(this.currentImage);
    }
  }

  /** Function to display the next image in the list (if not already at the end). We'll also notify cell-state.component of the current image change. */
  nextImage(){
    const index = this.imagesInfos.indexOf(this.currentImage);
    console.log(index,"/",this.imagesInfos.length)
    if(!(index===-1) && index<this.imagesInfos.length-1){
      this.currentImage = this.imagesInfos[index+1];
      this.change_current_img.emit(this.currentImage);
    }
  }

}