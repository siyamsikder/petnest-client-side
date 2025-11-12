import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const MyListings = () => {
  const { user } = use(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (user?.email) {
        fetch(`http://localhost:3000/listings?email=${user.email}`)
          .then((res) => res.json())
          .then(
            (data) => {
              console.log(data);
              setListings(data);
              setLoading(false);
            },
            [user?.email]
          );
      }
    });


  if (loading) {
    return <p className="text-center py-16">Loading your listings...</p>;
  }

  return (
    <div className="overflow-x-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">My Listings</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing, idx) => (
            <tr key={listing._id}>
              <th>{idx + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={listing.image} alt={listing.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{listing.name}</div>
                    <div className="text-sm opacity-50">{listing.location}</div>
                  </div>
                </div>
              </td>
              <td>
                <span className="badge badge-ghost badge-sm">
                  {listing.category}
                </span>
              </td>
              <td>
                {listing.price ? `৳ ${listing.price}` : "Free for Adoption"}
              </td>
              <td>
                <button className="btn btn-ghost btn-xs">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MyListings;
