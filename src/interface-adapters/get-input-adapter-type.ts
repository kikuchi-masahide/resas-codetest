// データソースとしてRESASとモックを切り替えるための関数を、
// テスト用に別ファイルに分離
export default function getInputAdapterType(): "resas" | "mock" {
    return "resas";
}
