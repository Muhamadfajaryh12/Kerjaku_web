export default interface ButtonProps {
  name: string;
  click?: () => void;
  type: "button" | "submit";
  link?: string;
}
