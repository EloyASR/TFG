import { images } from "../../../helpers/images";


function StepBar({ step }) {

    var porcentaje = (step-1)*100/3;

    return (
        <>
            <div className="form-steps">
                <div className="flex align-spread">
                    <div className="size-content">
                        <div className="flex align-start">
                            {
                                step >= 1 ?
                                    <img alt="" src={images("./form1step.png")} />
                                    :
                                    <img alt="" src={images("./form1step-dark.png")} />
                            }
                        </div>
                    </div>
                    <div className="size-content">
                        <div className="flex align-center">
                            {
                                step >= 2 ?
                                    <img alt="" src={images("./form2step.png")} />
                                    :
                                    <img alt="" src={images("./form2step-dark.png")} />
                            }
                        </div>
                    </div>
                    <div className="size-content">
                        <div className="flex align-end">
                            {
                                step >= 3 ?
                                    <img alt="" src={images("./form3step.png")} />
                                    :
                                    <img alt="" src={images("./form3step-dark.png")} />
                            }
                        </div>
                    </div>
                    <div className="size-content">
                        <div className="flex align-end">
                            {
                                step >= 4 ?
                                    <img alt="" src={images("./form4step.png")} />
                                    :
                                    <img alt="" src={images("./form4step-dark.png")} />
                            }
                        </div>
                    </div>
                </div>
                <div className="steps-bar">
                    <div className="steps-bar-progress">
                        <div className="progress-fill" style={{width:porcentaje+"%"}}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StepBar;