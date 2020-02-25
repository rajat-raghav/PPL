import React from 'react';

const Features = () => {
  return (
    <div className="rght_cate">
      <div className="rght_cate_hd" id="opn_cat_bg">
        Featured
      </div>
      <div className="sub_dwn">
        <div className="feat_sec">
          <div className="feat_sec_img">
            <img src="/images/feat_img1.png" alt="ima" />
          </div>
          <div className="feat_txt">Lorem Ipusum Text</div>
        </div>
        <div className="feat_sec">
          <div className="feat_sec_img">
            <img src="/images/feat_img2.png" alt="ima" />
          </div>
          <div className="feat_txt">Lorem Ipusum Text</div>
          <div className="btm_rgt">
            <div className="btm_arc">Dogs</div>
          </div>
        </div>
        <div className="feat_sec">
          <div className="feat_sec_img">
            <img src="/images/feat_img3.png" alt="ime" />
          </div>
          <div className="feat_txt">Lorem Ipusum Text</div>
          <div className="btm_rgt">
            <div className="btm_arc">Rabbits</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
