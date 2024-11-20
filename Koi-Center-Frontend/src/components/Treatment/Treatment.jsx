import React, { useState } from 'react'
import { updateKoiTreatmentAPI, updatePondTreatmentAPI } from '../../apis'
import { toast } from 'react-toastify'

const Treatment = (props) => {
    const [healthIssue, setHealthIssue] = useState(props.healthIssue || "")
    const [treatment, setTreatment] = useState(props.treatment || "")
    const handleSubmitTreatment = (e) => {
        e.preventDefault();
        let response;
        if (props.isKoi) {
            const updateKoiTreatment = async () => {
                response = await updateKoiTreatmentAPI({
                    healthIssue: healthIssue,
                    treatment: treatment,
                    koiTreatmentId: props.treatmentId

                })
                if (response.status === 200) {
                    toast.success(response.data.message)
                    props.onUpdate()
                }
            }
            updateKoiTreatment()
        } else if (props.isPond) {
            const updatePondTreatment = async () => {
                response = await updatePondTreatmentAPI({
                    healthIssue: healthIssue,
                    treatment: treatment,
                    pondTreatmentId: props.treatmentId
                })
                if (response.status === 200) {
                    toast.success(response.data.message)
                    props.onUpdate()
                }
            }
            updatePondTreatment()
        }

    }

    return (
        <div>
            <h1> Enter Treatment For {props.isKoi? "Koi": "Pond"}</h1>
            <form onSubmit={handleSubmitTreatment}>
                <div className="form-group">
                    <div className="form-group">
                        <label htmlFor="treatment">Health Issue</label>
                        <input type="text" className="form-control" id="treatment" name="treatment" value={healthIssue} onChange={(e) => setHealthIssue(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="treatment">Treatment</label>
                        <input type="text" className="form-control" id="treatment" name="treatment" value={treatment} onChange={(e) => setTreatment(e.target.value)} />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Treatment