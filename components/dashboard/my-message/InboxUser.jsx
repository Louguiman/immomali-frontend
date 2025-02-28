import SearchUser from "./SearchUser";
import SingleUser from "./SingleUser";

const InboxUser = ({ selectedInquiry, inquiries, onClick }) => {
  return (
    <div className="inbox_user_list">
      <div className="iu_heading">
        <div className="candidate_revew_search_box">
          <SearchUser />
        </div>
      </div>

      <ul>
        {inquiries?.map((inquiry) => (
          <SingleUser
            key={inquiry.id}
            inquiry={inquiry}
            isSelected={selectedInquiry?.id === inquiry.id}
            onClick={() => onClick(inquiry)}
          />
        ))}
      </ul>
    </div>
  );
};

export default InboxUser;
