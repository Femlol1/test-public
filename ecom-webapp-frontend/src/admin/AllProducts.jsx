import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";
import { db } from "../firebase.config";

// I define the AllProducts component
const AllProducts = () => {
	const { data: productsData, loading } = useGetData("products");

	// I define a function to delete a product
	const deleteProduct = async (id) => {
		await deleteDoc(doc(db, "products", id));
		toast.success("Product has been deleted");
	};

	return (
		<Container>
			<Row>
				<Col lg="12">
					<table className="table">
						<thead>
							<tr>
								<th>Image</th>
								<th>Product Name</th>
								<th>Category</th>
								<th>Price</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<h4 className="py-5 text-center fw-bold">Loading../|\..</h4>
							) : (
								productsData.map((item) => (
									<tr key={item.id}>
										<td>
											<img src={item.imgUrl} alt="" />
										</td>
										<td>{item.productName}</td>
										<td>{item.category}</td>
										<td>£{item.price}</td>
										<td>
											<button
												onClick={() => {
													deleteProduct(item.id);
												}}
												className="btn btn-danger"
											>
												Delete
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</Col>
			</Row>
		</Container>
	);
};

export default AllProducts;
