import leftSvg from "../assets/left.svg";
import rightSvg from "../assets/right.svg";

import { Button } from "./Button";

type Props = {
    currentPage: number;
    totalPages: number;
    onNext: () => void;
    onPrevious: () => void;
};

export function Pagination({
    currentPage,
    totalPages,
    onNext,
    onPrevious,
}: Props) {
    return (
        <div className="flex flex-1 gap-2 items-center justify-center">
            <Button
                variant="iconSmall"
                onClick={onPrevious}
                disabled={currentPage === 1}>
                <img src={leftSvg} alt="Página anterior" />
            </Button>

            <span className="text-sm text-gray-200">
                {currentPage}/{totalPages}
            </span>

            <Button
                variant="iconSmall"
                onClick={onNext}
                disabled={currentPage === totalPages}>
                <img src={rightSvg} alt="Próxima página" />
            </Button>
        </div>
    );
}
