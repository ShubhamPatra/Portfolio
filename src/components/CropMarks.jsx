/**
 * CropMarks - Print registration/crop marks at page corners
 * Gives the zine a "printed proof" look
 */
function CropMarks() {
    const markStyle = "fixed pointer-events-none select-none z-40 text-zine-ink/[0.07] hidden md:block";
    const lineLen = "w-8 h-px bg-zine-ink/[0.07]";
    const lineVert = "w-px h-8 bg-zine-ink/[0.07]";

    return (
        <div aria-hidden="true">
            {/* Top-left */}
            <div className={`${markStyle} top-6 left-6 flex flex-col items-start gap-1`}>
                <div className={lineLen}></div>
                <div className={`${lineVert} -mt-5 ml-0`}></div>
            </div>
            {/* Top-right */}
            <div className={`${markStyle} top-6 right-6 flex flex-col items-end gap-1`}>
                <div className={lineLen}></div>
                <div className={`${lineVert} -mt-5 mr-0`}></div>
            </div>
            {/* Bottom-left */}
            <div className={`${markStyle} bottom-6 left-6 flex flex-col-reverse items-start gap-1`}>
                <div className={lineLen}></div>
                <div className={`${lineVert} mt-0 ml-0`}></div>
            </div>
            {/* Bottom-right */}
            <div className={`${markStyle} bottom-6 right-6 flex flex-col-reverse items-end gap-1`}>
                <div className={lineLen}></div>
                <div className={`${lineVert} mt-0 mr-0`}></div>
            </div>
        </div>
    );
}

export default CropMarks;
