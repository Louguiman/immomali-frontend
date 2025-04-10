"use client";

import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCompare as removeFromCompareList } from "@/features/properties/propertiesSlice";
import { useFetchPropertyByIdQuery } from "@/features/api/properties.api";
import { useState } from "react";

const ComparePricing = () => {
  const dispatch = useDispatch();
  const compareList = useSelector((state) => state.properties.compareList);
  console.log("compareList", compareList);

  if (!compareList.length) {
    return (
      <li className="list-inline-item text-center w-100">
        <p>No properties selected for comparison.</p>
      </li>
    );
  }

  return (
    <>
      {compareList.map((item) => (
        <li className="list-inline-item" key={item}>
          <ComparePricingCard property={{ id: item }} />
        </li>
      ))}
    </>
  );
};

export default ComparePricing;

function ComparePricingCard({ property }) {
  const dispatch = useDispatch();
  const { data: item, isLoading } = useFetchPropertyByIdQuery(property.id, {
    skip: !property.id, // Skip the query if item.id is not available
    refetchOnMountOrArgChange: true, // Refetch when the component mounts or when item.id changes
    onSuccess: (data) => {
      console.log("Fetched property data:", data);
    }, // Set the property data on success
    onError: (error) => {
      console.error("Error fetching property:", error);
    }, // Handle error if needed
  });

  if (isLoading) {
    return <p>Loading...</p>; // Show loading state while fetching data
  }
  if (!property) {
    return <p>Property not found.</p>; // Handle case when property is not found
  }

  return (
    <ul className="mc_child_list two text-center">
      {/* Thumbnail and Title */}
      <li>
        <div className="membership_header">
          <div className="thumb">
            <a
              onMouseDown={() => dispatch(removeFromCompareList(item.id))}
              href="#"
              aria-label={`Remove ${item.title} from comparison`}
            >
              <span className="flaticon-close"></span>
            </a>
            <Image
              width={260}
              height={180}
              className="img-fluid w100 h-100 cover"
              src={item.images?.[0]?.imageUrl}
              alt="1.jpg"
            />
            <div className="price">
              {item.price} FCFA
              <span className="mnth">/mo</span>
            </div>
          </div>
          <div className="details">
            <h4>{item.title}</h4>
            <p>{item.type}</p>
          </div>
        </div>
      </li>

      {/* HEADERS MATCH BELOW */}
      <li>{item.city}</li>
      <li>{item.beds}</li>
      <li>{item.baths}</li>
      <li>{item.garages}</li>
      <li>{item.builtYear || "N/A"}</li>
      <li>{item.amenities?.laundry ? "Yes" : "No"}</li>
      <li>{item.isRented ? "Rented" : "Available"}</li>

      {/* ADDITIONAL FIELDS BELOW */}
      <li>{item.state}</li>
      <li>{item.country}</li>
      <li>{item.address}</li>
      <li>{item.neighborhood || "N/A"}</li>
      <li>{item.category}</li>
      <li>{item.type}</li>
      <li>{item.saleTag?.join(", ") || "None"}</li>
      <li>{item.sqFt} sqFt</li>
      <li>{item.attachments?.length ?? 0} file(s)</li>
      <li>{item.isFeatured ? "Yes" : "No"}</li>
      <li>{item.owner?.name || "N/A"}</li>
      <li>{item.agency?.name || "N/A"}</li>
      <li>{item.tenants?.length ?? 0} tenants</li>

      {/* All Amenities */}
      <li>{item.amenities?.airConditioning ? "✓" : "✗"}</li>
      <li>{item.amenities?.barbeque ? "✓" : "✗"}</li>
      <li>{item.amenities?.dryer ? "✓" : "✗"}</li>
      <li>{item.amenities?.gym ? "✓" : "✗"}</li>
      <li>{item.amenities?.lawn ? "✓" : "✗"}</li>
      <li>{item.amenities?.microwave ? "✓" : "✗"}</li>
      <li>{item.amenities?.outdoorShower ? "✓" : "✗"}</li>
      <li>{item.amenities?.refrigerator ? "✓" : "✗"}</li>
      <li>{item.amenities?.sauna ? "✓" : "✗"}</li>
      <li>{item.amenities?.swimmingPool ? "✓" : "✗"}</li>
      <li>{item.amenities?.tvCable ? "✓" : "✗"}</li>
      <li>{item.amenities?.washer ? "✓" : "✗"}</li>
      <li>{item.amenities?.wifi ? "✓" : "✗"}</li>
      <li>{item.amenities?.windowCoverings ? "✓" : "✗"}</li>

      {/* Action */}
      <li>
        <a className="btn pricing_btn" href={`/listing-details-v2/${item.id}`}>
          View
        </a>
      </li>
    </ul>
  );
}
