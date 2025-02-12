const useGetFavicon = (url: string) => {
  function getDomainName(url: string) {
    try {
      const domain = new URL(url).hostname;
      return domain.replace(/^www\./, ""); // Remove 'www.' if present
    } catch (error) {
      return null;
    }
  }

  return { getDomainName };
};

export default useGetFavicon;
