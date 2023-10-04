import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import Rating from "../components/Rating";
import { prices, ratings } from "../utils";

export default function SearchScreen(props) {
  const {
    name = "all",
    category = "all",
    gender = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    pageNumber = 1,
  } = useParams();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  const productGenderList = useSelector((state) => state.productGenderList);
  const {
    loading: loadingGenders,
    error: errorGenders,
    genders,
  } = productGenderList;

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        gender: gender !== "all" ? gender : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, gender, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterGender = filter.gender || gender;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/gender/${filterGender}/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };

  return (
    <div>
      <div className="categorycontainer">
        <div className="result">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div>{products.length} Results</div>
          )}
        </div>
        <div className="sorting">
          Sort by{" "}
          <select
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </div>
      </div>
      <div className="categorycontainer">
        <div className="category">
          <h3>Department</h3>
          {loadingCategories ? (
            <LoadingBox></LoadingBox>
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            <div>
              <ul>
                <li>
                  <Link
                    className={"all" === category ? "active" : ""}
                    to={getFilterUrl({ category: "all" })}
                  >
                    Any
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? "active" : ""}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <h3>Gender</h3>
          {loadingGenders ? (
            <LoadingBox></LoadingBox>
          ) : errorGenders ? (
            <MessageBox variant="danger">{errorGenders}</MessageBox>
          ) : (
            <div className="listcate">
              <ul>
                <li>
                  <Link
                    className={"all" === gender ? "active" : ""}
                    to={getFilterUrl({ gender: "all" })}
                  >
                    Any
                  </Link>
                </li>
                {genders.map((g) => (
                  <li key={g}>
                    <Link
                      className={g === gender ? "active" : ""}
                      to={getFilterUrl({ gender: g })}
                    >
                      {g}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <h3>Price</h3>
          <div className="listcate">
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? "active" : ""
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <h3>Avg. Customer Review</h3>
          <div className="listcate">
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <div className="ratinglist">
                    <Link
                      to={getFilterUrl({ rating: r.rating })}
                      className={`${r.rating}` === `${rating}` ? "active" : ""}
                    >
                      <Rating caption={" & up"} rating={r.rating}></Rating>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="product-card">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="row-productlist">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
              <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? "active" : ""}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
