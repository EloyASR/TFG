import {useEffect, useState} from "react";

function Pagination({numPages, onClick}) {

    const [selectedPage, setSelectedPage] = useState(1);
    const [buttons, setButtons] = useState([]);

    useEffect(()=>{
        generateButtons();
    },[numPages,selectedPage])

    const generateButtons = () => {

        const newButtons = [];
        const maxVisibleButtons = 7;

        if (numPages <= maxVisibleButtons) {
            for (let i = 1; i <= numPages; i++) {
                newButtons.push(i);
            }
        } else {
            const leftEdge = selectedPage <= 4;
            const rightEdge = selectedPage >= numPages - 3;
            const middle = !leftEdge && !rightEdge;

            console.log(leftEdge,rightEdge,middle);

            if (leftEdge) {
                for (let i = 1; i <= 5; i++) {
                    newButtons.push(i);
                }
                newButtons.push("...");
                newButtons.push(numPages);
            } else if (rightEdge) {
                newButtons.push(1);
                newButtons.push("...");
                for (let i = numPages - 4; i <= numPages; i++) {
                    newButtons.push(i);
                }
            } else if (middle) {
                newButtons.push(1);
                newButtons.push("...");
                for (let i = selectedPage - 1; i <= selectedPage + 1; i++) {
                    newButtons.push(i);
                }
                newButtons.push("...");
                newButtons.push(numPages);
            }
        }

        console.log(buttons);
        setButtons(newButtons);
    }

    const upPage = () => {
        if(selectedPage < numPages) {
            onClick(selectedPage+1);
            setSelectedPage(selectedPage+1);
        }
    }

    const downPage = () => {
        if(selectedPage > 1) {
            onClick(selectedPage-1)
            setSelectedPage(selectedPage-1);
        }
    }

    return <>
        <div className="pagination flex horizontal gap-medium">
            <button className={"pagination-arrow"} onClick={downPage}>
                &lt;
            </button>
            {buttons.map((number, index) => {
                if(number === "..."){
                    return <span>{number}</span>
                }
                return (
                    <button key={index}
                        onClick={() => {
                            setSelectedPage(number);
                            onClick(number);
                        }}
                        className={selectedPage === number ? "active" : ""}
                    >
                        {number}
                    </button>
                );
            })}
            <button className={"pagination-arrow"} onClick={upPage}>
                &gt;
            </button>
        </div>
    </>
}

export  default  Pagination;