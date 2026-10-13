declare module "page-flip" {
  export class PageFlip {
    constructor(element: HTMLElement, options?: any);
    loadFromHTML(items: NodeListOf<Element> | HTMLElement[]): void;
    loadFromImages(images: string[]): void;
    destroy(): void;
    turnToPage(pageNum: number): void;
    turnToPrevPage(): void;
    turnToNextPage(): void;
    flipNext(corner?: string): void;
    flipPrev(corner?: string): void;
    flip(pageNum: number, corner?: string): void;
    on(event: string, callback: (e: any) => void): void;
    off(event: string, callback?: (e: any) => void): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    getOrientation(): "portrait" | "landscape";
    getBoundsRect(): any;
    update(): void;
  }
}
