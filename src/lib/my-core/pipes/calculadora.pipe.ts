import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name:'commaReplace'
})
export class CommaReplacePipe implements PipeTransform {
  transform(value:string, args?:any):any {
    return value?.replace(/\./g, '\,');
  }
}

export const PIPES_CALCULADORA = [ CommaReplacePipe, ]
