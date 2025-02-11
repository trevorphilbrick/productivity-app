const useGetFavicon = (url: string) => {
  function getDomainName(url: string) {
    try {
      const domain = new URL(url).hostname;
      return domain.replace(/^www\./, ""); // Remove 'www.' if present
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  }
  const getFavicon = async () => {
    const domain = getDomainName(url);
    console.log(domain);
    const res = await fetch(
      `https://www.faviconextractor.com/favicon/${domain}`
    );
    const data = await res.json();
    return data;
  };

  return { getFavicon, getDomainName };
};

export default useGetFavicon;
