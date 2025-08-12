"use client";

import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { removeFromCompare as removeFromCompareList } from "@/features/properties/propertiesSlice";
import { useFetchPropertyByIdQuery } from "@/features/api/properties.api";
import Link from "next/link";

const ComparePricing = () => {
  const compareList = useAppSelector((state) => state.properties.compareList);

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
          <ComparePricingCard propertyId={item} />
        </li>
      ))}
    </>
  );
};

export default ComparePricing;

function ComparePricingCard({ propertyId }: { propertyId: string }) {
  const dispatch = useAppDispatch();
  const { data: property, isLoading } = useFetchPropertyByIdQuery(
    String(propertyId),
    {
      skip: !propertyId, // Skip the query if item.id is not available
      refetchOnMountOrArgChange: true, // Refetch when the component mounts or when item.id changes
    }
  );

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
              onMouseDown={() => dispatch(removeFromCompareList(property.id))}
              href="#"
              aria-label={`Remove ${property.title} from comparison`}
            >
              <span className="flaticon-close"></span>
            </a>
            <Image
              width={260}
              height={180}
              className="img-fluid w100 h-100 cover"
              src={
                property.images?.[0]?.imageUrl ||
                "/images/placeholder-property.jpg"
              }
              alt={property.title || "Property image"}
            />
            <div className="price">
              {property.price} FCFA
              <span className="mnth">/mo</span>
            </div>
          </div>
          <div className="details">
            <h4>{property.title}</h4>
            <p>{property.type}</p>
          </div>
        </div>
      </li>

      {/* HEADERS MATCH BELOW */}
      <li>{property.city}</li>
      <li>{property.beds}</li>
      <li>{property.baths}</li>
      <li>{property.garages}</li>
      <li>{property.builtYear || "N/A"}</li>
      <li>{property.amenities?.laundry ? "Yes" : "No"}</li>
      <li>{property.isRented ? "Rented" : "Available"}</li>

      {/* ADDITIONAL FIELDS BELOW */}
      <li>{property.state}</li>
      <li>{property.country}</li>
      <li>{property.address}</li>
      <li>{property.neighborhood || "N/A"}</li>
      <li>{property.category}</li>
      <li>{property.type}</li>
      <li>{property.saleTag?.join(", ") || "None"}</li>
      <li>{property.sqFt} sqFt</li>
      <li>{property.attachments?.length ?? 0} file(s)</li>
      <li>{property.isFeatured ? "Yes" : "No"}</li>
      <li>{property.owner?.name || "N/A"}</li>
      <li>{property.agency?.name || "N/A"}</li>
      <li>{property.tenants?.length ?? 0} tenants</li>

      {/* All Amenities */}
      <li>{property.amenities?.airConditioning ? "✓" : "✗"}</li>
      <li>{property.amenities?.barbeque ? "✓" : "✗"}</li>
      <li>{property.amenities?.dryer ? "✓" : "✗"}</li>
      <li>{property.amenities?.gym ? "✓" : "✗"}</li>
      <li>{property.amenities?.lawn ? "✓" : "✗"}</li>
      <li>{property.amenities?.microwave ? "✓" : "✗"}</li>
      <li>{property.amenities?.outdoorShower ? "✓" : "✗"}</li>
      <li>{property.amenities?.refrigerator ? "✓" : "✗"}</li>
      <li>{property.amenities?.sauna ? "✓" : "✗"}</li>
      <li>{property.amenities?.swimmingPool ? "✓" : "✗"}</li>
      <li>{property.amenities?.tvCable ? "✓" : "✗"}</li>
      <li>{property.amenities?.washer ? "✓" : "✗"}</li>
      <li>{property.amenities?.wifi ? "✓" : "✗"}</li>
      <li>{property.amenities?.windowCoverings ? "✓" : "✗"}</li>

      {/* Action */}
      <li>
        <Link
          className="btn pricing_btn"
          href={`/listing-details-v2/${property.id}`}
        >
          View
        </Link>
      </li>
    </ul>
  );
}
