export class DisplayContentModel {
  constructor(
    public title: string,
    public sanitizeTitle: string,
    public content: Array<{ field: string, content: string }>
  ) { }
}
