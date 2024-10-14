import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Text from "./Text";
import { useState } from "react";

export function CommonDialog({
  title,
  description,
  buttonLabel,
  label,
  placeholder = "Enter",
  name,
  value,
  onChange,
  onClick,
}: {
  title: string;
  description?: string;
  buttonLabel: string;
  label: string;
  placeholder?: string;
  name?: string;
  value?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: any;
  onClick: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    onClick(); // Trigger the callback for submit
    setOpen(false); // Close the dialog after submit
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Text
          className="text-[#9575CD] text-[12px] font-bold"
          onClick={() => setOpen(true)}
        >
          {title}
        </Text>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Label htmlFor={label}>{label}</Label>
          <Input
            id={label}
            className="max-w-[425px] w-[100%]"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
          />
        </div>
        <DialogFooter>
          <Button className="bg-[#9575CD]" onClick={handleSubmit}>
            {buttonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
