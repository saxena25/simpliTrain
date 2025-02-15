import React, { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import pencil from "../../assets/svgs/pencil.svg";
import {
  Button,
  Container,
  FloatingTextField,
} from "../../components/ui-components";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import downArrow from "../../assets/svgs/downArrow.svg";
import upArrow from "../../assets/svgs/upArrow.svg";
import PaymentBox from "./PaymentBox";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import Participants from "./Participants";
import FlexiblePayment from "./FlexiblePayment";
import paymentFailed from "../../assets/svgs/paymentFailed.svg";
import reviewLeftArrow from "../../assets/svgs/reviewLeftArrow.svg";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { checkIsMobile } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import {
  getBatchId,
  getBatchParticipants,
} from "../../redux/courses/actionCreator";
import {
  CreateOrder,
  GetCoupons,
  GetFinalPrice,
  GetPriceBreakup,
  PurchaseBatch,
} from "../../redux/checkout/actionCreator";

const getBatchParticipantsData = async (id) => {
  return new Promise(async (resolve, reject) => {
    const responce = await store.dispatch(getBatchParticipants());
    if (responce && responce.type == "COURSE_SUCCESS") {
      resolve(responce.data);
    } else {
      resolve([]);
    }
  });
};

// const getBatchCouponsList = async(id) => {
//   return new Promise(async(resolve, reject)=>{
//     const responce = await store.dispatch(GetCoupons());
//     if(responce && responce.type == 'CHECKOUT_SUCCESS'){
//       resolve(responce.data);
//     }else{
//       resolve([]);
//     }
//   })
// }

export async function checkoutLoader() {
  const participants = await getBatchParticipantsData();
  // const coupons = await getBatchCouponsList();
  return {
    date: new Date().toISOString(),
    participants: participants,
    // coupons:coupons
  };
}

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  let loadingData = useLoaderData();
  const { userData } = useSelector((state) => {
    return {
      userData: state.auth.data,
    };
  });

  const [batchId, setBatchId] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [primaryParticipant, setPrimaryParticipant] = useState({
    id: userData.id,
    name: userData.name,
    email: userData.email,
    mobile: userData.mobile,
  });
  const [participants, setParticipants] = useState([
    {
      email: userData.email,
      mobile: userData.mobile,
    },
  ]);
  const [batch, setBatch] = useState(null);
  const [batchPrice, setBatchPrice] = useState({});
  const [isPaymentFailed, setIsPaymentFailed] = useState(false);
  const isMobile = checkIsMobile();

  const getBatchData = async (id) => {
    const response = await store.dispatch(getBatchId({ batchId: id }));
    if (response && response.type === "BATCH_SUCCESS") {
      console.log("batchbatch", response.data);
      setBatch(response.data);
    } else {
    }
  };

  const GetPrice = async (id) => {
    const response = await store.dispatch(GetPriceBreakup({ batchId: id }));
    if (response && response.type === "CHECKOUT_SUCCESS") {
      console.log("batchbatch", response.data);
      setBatchPrice(response.data);
    } else {
    }
  };

  const GetFinalPriceAction = async (id, partMembers, coupon) => {
    const pricePost = {
      batchId: id,
      couponId: coupon ? coupon.id : null,
      participants: partMembers,
    };
    const response = await store.dispatch(GetFinalPrice(pricePost));
    if (response && response.type === "CHECKOUT_SUCCESS") {
      console.log("batchbatch", response.data);
      // setBatchPrice(response.data);
    } else {
    }
  };

  // setPrimaryParticipant

  useEffect(() => {
    console.log("participants, appliedCoupon", participants, appliedCoupon);
    if (batchId && participants.length > 0) {
      GetFinalPriceAction(batchId, participants, appliedCoupon);
    }
  }, [batchId && participants, appliedCoupon]);

  useEffect(() => {
    if (location && location.state) {
      console.log("location.state", location.state);
      setBatchId(location.state.batchId);
      getBatchData(location.state.batchId);
      GetPrice(location.state.batchId);
    } else {
      navigate("/");
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const finalPurchaseBatch = async (Obj) => {
    // const postData = {
    //   userId: Obj.id,
    //   batchId: Obj.batchId,
    //   amount: Obj.amount,
    //   razorpay_order_id: Obj.razorpay_order_id,
    //   razorpay_payment_id: Obj.razorpay_payment_id,
    //   razorpay_signature: Obj.razorpay_signature,
    // }
    const response = await store.dispatch(PurchaseBatch(Obj));
    if (response && response.type === "CHECKOUT_SUCCESS") {
      console.log("Order", response.data);
      // setBatchPrice(response.data);
      navigate("/checkout/confirmation/" + Obj.razorpay_order_id);
    } else {
    }
  };

  const handlePayment = (Obj) => {
    const options = {
      key: "rzp_test_zRl2GVjoC4RIuU", // Replace with your Razorpay Key
      amount: Obj.amount, // Amount in paise (50000 = ₹500)
      currency: "INR",
      order_id: Obj.orderId,
      name: "Simplitrain",
      description: "Payment for Order #" + Obj.orderId,
      handler: function (response) {
        console.log("Simplitrain Response", response);
        // alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        finalPurchaseBatch({
          userId: Obj.userId,
          batchId: Obj.batchId,
          amount: Obj.amount,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
      },
      prefill: {
        name: userData.name,
        email: userData.email,
        contact: userData.mobile,
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const PayNow = async () => {
    const postData = {
      amount: 1, // INR 1
      userId: userData.id,
      batchId: batchId,
      courseId: batch.courseId,
      participants: participants,
    };
    const response = await store.dispatch(CreateOrder(postData));
    if (response && response.type === "CHECKOUT_SUCCESS") {
      console.log("Order", response.data);
      // setBatchPrice(response.data);
      handlePayment({
        userId: userData.id,
        batchId: batchId,
        courseId: batch.courseId,
        amount: response.data.amount,
        orderId: response.data.id,
      });
    } else {
    }
  };

  return (
    <section className="w-full bg-gray-50 py-10">
      <Container className="md:px-10">
        <div className="flex flex-col md:flex-row md:gap-4">
          <button onClick={() => navigate(-1)}>
            <img
              src={reviewLeftArrow}
              alt="Back Arrow"
              // onClick={()=> navigate(-1)}
              className={`${isMobile && "w-fit border rounded-full p-2"}`}
            />
          </button>
          <h1 className="text-3xl md:text-2xl text-secondary font-medium py-2 md:py-4">
            Checkout
          </h1>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-5 md:gap-12 my-2 md:my-0">
          {/* left Box */}
          <div className="w-full max-w-4xl">
            {isPaymentFailed && (
              <div className="bg-custom-gradient border border-[#D93C4C] p-4 flex flex-row gap-4 rounded-xl mb-8">
                <img src={paymentFailed} alt="paymentFailed" />
                <div>
                  <h2 className="text-base text-secondary font-medium">
                    Payment Failed!
                  </h2>
                  <p className="text-sm text-[#707070CC]">
                    We encountered an issue with your payment. Please try again
                  </p>
                </div>
              </div>
            )}

            {/* Course Name */}
            <div className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between md:items-center bg-white border border-gray-300 p-4 rounded-2xl">
              <div className="flex flex-col gap-1">
                <h1 className="text-lg md:text-xl text-secondary font-medium">
                  {batch?.title}
                </h1>
                <p className="text-xs md:text-sm text-primary flex justify-between items-center gap-4">
                  <span>{batch?.batchMode}</span>|
                  <span>
                    {moment(new Date(batch?.startDate)).format("DD, MMM YY")} -{" "}
                    {moment(new Date(batch?.endDate)).format("DD, MMM YY")}
                  </span>
                  {/* Batch 1&nbsp; | &nbsp;Online&nbsp; | &nbsp;One on One&nbsp; | */}
                  {/* &nbsp;May 24 - Aug 24 */}
                </p>
              </div>
              <div className="flex flex-row gap-1 bg-[#E8E7E7] items-center py-1 px-3 md:px-4 md:py-2 w-fit md:max-h-fit rounded-full">
                <img src={pencil} alt="pencil" />
                <p className="text-xs text-[#3B4350] whitespace-nowrap">
                  EDIT BATCH
                </p>
              </div>
            </div>

            {/* Add Participants */}
            <Participants
              primaryParticipant={{ ...primaryParticipant }}
              participants={[...participants]}
              setParticipants={setParticipants}
              OldParticipants={loadingData.participants}
              batchId={batchId}
            />

            {/* Flexible Payments */}
            {/* <FlexiblePayment /> */}
          </div>

          {/* right box */}
          <PaymentBox
            batchPrice={batchPrice}
            coupons={batch?.coupons ? batch?.coupons : []}
            appliedCoupon={appliedCoupon}
            setAppliedCoupon={setAppliedCoupon}
            PayNow={PayNow}
          />
        </div>
      </Container>
      {isMobile && (
        <div className="w-full shadow-3xl fixed bottom-0 left-0 right-0 bg-white">
          <div className="w-full flex flex-row justify-between items-center py-3 px-5">
            <div>
              <h4 className="flex flex-row justify-start items-center gap-1 md:gap-3">
                <span className="text-lg md:text-xl text-text font-semibold">
                  ₹ 30,090
                </span>
                <span className="text-sm text-gray-600 font-medium">
                  20% Off
                </span>
              </h4>
              <h6 className="text-sm  text-gray-600 font-medium">
                <del>₹ 14,057</del>
              </h6>
            </div>
            <div>
              <Button
                onClick={() => PayNow()}
                className="rounded-xl md:rounded-2xl bg-[#0E121D] px-6 md:px-3.5 py-2.5 md:w-48 flex justify-center text-xs md:text-lg font-semibold text-white shadow-sm hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Checkout;
