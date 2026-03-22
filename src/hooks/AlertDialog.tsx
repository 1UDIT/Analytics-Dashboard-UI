import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleConfirm: () => void;
  title?: string;
  description?: string;
  actionType?: "open" | "delete" | null;
}

export function Alert({
    open,
    setOpen,
    title = "Open Dataset?",
    description = "Are you sure you want to open this file?",
    handleConfirm,
    actionType
}: AlertProps) {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="max-w-md bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-semibold">
                        {title}
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleConfirm}
                        className={
                            actionType === "delete"
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-green-600 hover:bg-green-700 text-white"
                        }
                    >
                        {actionType === "delete" ? "Delete" : "Open"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}