// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    txColor: string;
    accentColor: string;
    cardBg: string;
    cardBoard: string;
  }
}
