// Nairobi CBD coordinates
export const NAIROBI_CBD = { lat: -1.286389, lng: 36.817223 };

// Calculate straight-line (Haversine) distance between two points in km
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

const PRICING_ZONES = [
  {
    name: 'Immediate Radius',
    areas: ['ngara', 'pangani', 'starehe', 'upper hill', 'community'],
    maxDistance: 4, // km
    price: 250
  },
  {
    name: 'Inner Suburbs',
    areas: ['westlands', 'kilimani', 'kileleshwa', 'parklands', 'lavington', 'south b', 'south c', 'nairobi west'],
    maxDistance: 8,
    price: 300
  },
  {
    name: 'Mid-Tier Ring',
    areas: ['roysambu', 'kasarani', 'mbagathi', 'dagoretti', 'eastleigh'],
    maxDistance: 12,
    price: 400
  },
  {
    name: 'Outer Ring / Highways',
    areas: ['thika road', 'mombasa road', 'langata', 'galleria', 'ngong road', 'kangemi'],
    maxDistance: 18,
    price: 500
  },
  {
    name: 'Nairobi Outskirts',
    areas: ['karen', 'kikuyu', 'kiambu', 'ruiru', 'kitengela', 'rongai', 'athi river'],
    maxDistance: 35,
    price: 800
  }
];

export async function estimateFare(pickupName: string, destName: string, pickupLat: number, pickupLng: number, destLat: number, destLng: number): Promise<{
  totalFare: number,
  baseFare: number,
  distanceFare: number,
  distance: number,
  duration: number
}> {
  // 1. Calculate actual distance and duration between pickup and dropoff using OSRM
  let routeDistance = calculateDistance(pickupLat, pickupLng, destLat, destLng); // Fallback Haversine
  let routeDuration = routeDistance * (60 / 20) * 60; // Fallback: 20km/h average speed in seconds

  try {
    const osrmRes = await fetch(`https://router.project-osrm.org/route/v1/driving/${pickupLng},${pickupLat};${destLng},${destLat}?overview=false`);
    const osrmData = await osrmRes.json();
    if (osrmData.code === 'Ok' && osrmData.routes.length > 0) {
      routeDistance = osrmData.routes[0].distance / 1000; // convert meters to km
      routeDuration = osrmData.routes[0].duration; // in seconds
    }
  } catch (err) {
    console.error("OSRM fetch failed, falling back to straight-line distance.", err);
  }

  // Convert duration to minutes
  const durationMinutes = Math.ceil(routeDuration / 60);
  
  // 2. Find the zone based on CBD distance for pickup and dest
  const cbdToPickup = calculateDistance(NAIROBI_CBD.lat, NAIROBI_CBD.lng, pickupLat, pickupLng);
  const cbdToDest = calculateDistance(NAIROBI_CBD.lat, NAIROBI_CBD.lng, destLat, destLng);
  
  // We take the further point to determine the base tier
  const maxDistanceFromCbd = Math.max(cbdToPickup, cbdToDest);
  
  // Also check keywords
  const combinedNames = (pickupName + ' ' + destName).toLowerCase();
  
  let selectedZone = PRICING_ZONES[0]; // Default to immediate
  
  for (const zone of PRICING_ZONES) {
    const hasKeywordMatch = zone.areas.some(area => combinedNames.includes(area));
    if (hasKeywordMatch || maxDistanceFromCbd <= zone.maxDistance) {
      selectedZone = zone;
      // Continue to find the highest applicable tier if distance is larger
      if (!hasKeywordMatch && maxDistanceFromCbd > zone.maxDistance) {
         continue;
      } else {
         break;
      }
    }
  }

  // Final fallback if distance is huge
  if (maxDistanceFromCbd > 35) {
     selectedZone = PRICING_ZONES[PRICING_ZONES.length - 1]; // Outskirts max
  }

  // Base fare from the zone
  const baseFare = selectedZone.price;
  
  // Optional: add extra cost per km if route distance is very long
  let distanceFare = 0;
  if (routeDistance > selectedZone.maxDistance) {
     distanceFare = Math.floor((routeDistance - selectedZone.maxDistance) * 30); // 30 KES per extra km
  }

  return {
    totalFare: baseFare + distanceFare,
    baseFare,
    distanceFare,
    distance: parseFloat(routeDistance.toFixed(1)),
    duration: durationMinutes
  };
}
