export function queryStringFormatter(searchParamsObj: {
  [key: string]: string | string[] | undefined;
}): string {
  let queryString = "";
  // {searchTerm: "John", speciality: "Cardiology"}
  // after entries: [ ["searchTerm", "John"], ["speciality", "Cardiology"] ]
  const queryArray = Object.entries(searchParamsObj).map(([key, value]) => {
    if (Array.isArray(value)) {
      // { speciality: ["Cardiology", "Neurology"] }
      // ["Cardiology", "Neurology"]
      // ?speciality=Cardiology&speciality=Neurology
      return value.map((v) => `${key}=${encodeURIComponent(v)}`).join("&");
    } else if (value !== undefined) {
      return `${key}=${encodeURIComponent(value)}`;
    }
    return "";
  });
  queryString = queryArray.filter((q) => q !== "").join("&"); // searchTerm=John&speciality=Cardiology&speciality=Neurology
  return queryString;
}

// slug formate
export function formatSlugToName(slug: string) {
  if (!slug) {
    return "";
  }
  const decodedSlug = decodeURIComponent(slug);
  
  const withSpaces = decodedSlug.replace(/-/g, " ");
  
  const capitalized = withSpaces
    .split(" ")
    .map((word) => {
      if (word.length === 0) {
        return "";
      }

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
    

  return capitalized;
}