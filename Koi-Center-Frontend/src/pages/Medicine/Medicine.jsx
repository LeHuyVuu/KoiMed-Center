import React from 'react'
import "../Medicine/Medicine.css"

function Medicine() {
  return (
    <div className="container mx-auto px-4 py-5">  
        <section className="mb-5">  
            <h2 className="h4 font-weight-bold mb-4">DETAIL FISH</h2>  
            <div className="overflow-auto">  
                <table className="table table-bordered">  
                    <thead className="thead-light">  
                        <tr>  
                            <th>Name</th>  
                            <th>Weight</th>  
                            <th>Price</th>  
                            <th>PRESCRIPTION</th>  

                        </tr>  
                    </thead>  
                    <tbody>  
                        <tr>  
                            <td>Salmon</td>  
                            <td>2.5 kg</td>  
                            <td>$25</td>  
                            <td>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Choose Prescription</option>
                                    <option value="Prescription 1">Prescription 1</option>
                                    <option value="Prescription 2">Prescription 2</option>
                                    <option value="Prescription 1">Prescription 3</option>
                                  </select>
                            </td>
                        </tr>  
                        <tr>  
                            <td>Tuna</td>  
                            <td>3.0 kg</td>  
                            <td>$30</td>  
                            <td>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Choose Prescription</option>
                                    <option value="Prescription 1">Prescription 1</option>
                                    <option value="Prescription 2">Prescription 2</option>
                                    <option value="Prescription 1">Prescription 3</option>
                                  </select>
                            </td>
                        </tr>  
                        <tr>  
                            <td>Cod</td>  
                            <td>1.8 kg</td>  
                            <td>$20</td>  
                            <td>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Choose Prescription</option>
                                    <option value="Prescription 1">Prescription 1</option>
                                    <option value="Prescription 2">Prescription 2</option>
                                    <option value="Prescription 1">Prescription 3</option>
                                  </select>
                            </td>
                        </tr>  
                    </tbody>  
                </table>  
            </div>  
        </section>  

        <section className="mb-5">  
            <h2 className="h4 font-weight-bold mb-4">PRESCRIPTION</h2>  
            <div className="overflow-auto">  
                <table className="table table-bordered">  
                    <thead className="thead-light">  
                        <tr>  
                            <th>Prescription ID </th>
                            <th>Prescription Name </th>  
                            <th>Dosage</th>  
                            <th>Frequency</th>  
                        </tr>  
                    </thead>  
                    <tbody>  
                        <tr>  <td>Prescription 1 </td>
                            <td>Thuốc đau đầu </td>  
                            <td>500mg</td>  
                            <td>Twice daily</td>  
                        </tr>  
                        <tr>  <td>Prescription 2 </td>

                            <td>Ibuprofen</td>  
                            <td>400mg</td>  
                            <td>Three times daily</td>  
                        </tr>  
                        <tr>  
                            <td>Prescription 3 </td>
                            <td>Paracetamol</td>  
                            <td>1000mg</td>  
                            <td>As needed</td>  
                        </tr>  
                    </tbody>  
                </table>  
                <button className="btn btn-primary">  
                 Add Prescription 
                </button>  
            </div>  
        </section>  

        <div className="d-flex justify-content-between">  
            <button className="btn btn-primary  ">  
                <i className="fas fa-chevron-left mr-2"></i> Previous Article  
            </button>  
            <button className="btn btn-primary">  
                Next Article <i className="fas fa-chevron-right ml-2"></i>  
            </button>  
        </div>  
    </div>  
  )
}

export default Medicine