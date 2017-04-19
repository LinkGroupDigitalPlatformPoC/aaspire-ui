export class AppSettings {
    // API Connect

    // members
    // GET - members matching specified search criteria
    public static API_MEMBER_SEARCH = "https://api.us.apiconnect.ibmcloud.com/mangluibmorg-linkgrouppoc-dev/sb/members?search=";

    // engagements
    // POST - new engagement
    public static API_ENGAGEMENT_ADD = "https://api.us.apiconnect.ibmcloud.com/mangluibmorg-linkgrouppoc-dev/sb/engagements";
    // PUT - modify engagement
    public static API_ENGAGEMENT_MODIFY = "";
    // GET - retrieve engagement
    public static API_ENGAGEMENT_SEARCH = "https://api.us.apiconnect.ibmcloud.com/mangluibmorg-linkgrouppoc-dev/sb/members/"; // {id}/engagements

    // reference data
    // GET - all reference data
    public static API_REFERENCE_DATA_ALL = "https://api.us.apiconnect.ibmcloud.com/mangluibmorg-linkgrouppoc-dev/sb/referencedata";
    // GET - reference data for a specific id
    public static API_REFERENCE_DATA_SPECIFIC = "https://api.us.apiconnect.ibmcloud.com/mangluibmorg-linkgrouppoc-dev/sb/referencedata/"; // {id}
}