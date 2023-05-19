import React from 'react';
import OfferItem from './OfferItem';
import { Lorem } from './data';

const Offer = () => {
    return (
        <div className="container mx-auto px-5 grid lg:grid-cols-4 sm:grid-cols-2 gap-8">
          <OfferItem
            img="/24-7.png"
            text="24/7 Support"
            imgIcon="/tech-support.gif"
            lorem="Chúng tôi hiểu tầm quan trọng của việc cung cấp hỗ trợ liên tục cho các sản phẩm của chúng tôi. Đó là lý do tại sao chúng tôi cung cấp dịch vụ hỗ trợ suốt ngày đêm, 24 giờ một ngày, 7 ngày một tuần. Nhóm hỗ trợ chuyên dụng của chúng tôi luôn sẵn sàng hỗ trợ bạn, bất kể thời gian hay ngày."
          ></OfferItem>
          <OfferItem
            img="/cash-back.png"
            text="Cash Back"
            imgIcon="/cashback.gif"
            lorem="Các chương trình hoàn tiền ngày càng trở nên phổ biến đối với người tiêu dùng và tại công ty của tôi, chúng tôi cung cấp tính năng hoàn tiền thú vị để nâng cao trải nghiệm mua sắm của bạn."
          ></OfferItem>
          <OfferItem
            img="/discount.png"
            text="Monthly Offer"
            imgIcon="/black-friday.gif"
            lorem="Giới thiệu ưu đãi hàng tháng thú vị của chúng tôi! Tại công ty của chúng tôi, chúng tôi tin tưởng vào việc cung cấp cho khách hàng có giá trị của mình các ưu đãi và khuyến mãi độc quyền giúp trải nghiệm của họ trở nên bổ ích hơn."
          ></OfferItem>
          <OfferItem
            img="/premium.png"
            text="Membership"
            imgIcon="/award.gif"
            lorem="Giới thiệu chương trình thành viên độc quyền của chúng tôi! Chúng tôi rất vui mừng mang đến cho các khách hàng thân thiết của mình cơ hội trở thành thành viên và mở khóa nhiều lợi ích và đặc quyền."
          ></OfferItem>
        </div>
    );
};

export default Offer;