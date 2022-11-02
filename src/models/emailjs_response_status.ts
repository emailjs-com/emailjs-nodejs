export class EmailJSResponseStatus {
  public status: number;
  public text: string;

  constructor(status?: number, text?: string) {
    this.status = status || 0;
    this.text = text || 'Network Error';
  }
}
