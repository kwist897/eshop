export default interface Category {
    key:string,
    code:string,
    label:string,
    children?:Category[],
    command(e:any):void,
}