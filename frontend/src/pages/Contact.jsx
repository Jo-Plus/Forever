import React from "react";
import Title from "../components/Title.jsx";
import { assets } from "../assets/assets.js";
import NewsLetterBox from "../components/NewsLetterBox.jsx";

function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center text-3xl pt-10 border-t mt-[70px] border-gray-200">
        <Title text1={"CONTACT"} text2={"US"} />
        <p className="mt-3 text-gray-500 text-sm max-w-xl mx-auto">
          We’d love to hear from you. Get in touch with us anytime.
        </p>
      </div>
      <div className="my-16 flex flex-col md:flex-row items-center gap-14 mb-28">
        <img src={assets.contact_img} alt="contact_img" className="w-full md:max-w-[480px] rounded-2xl shadow-lg object-cover" />
        <div className="flex flex-col gap-6 text-gray-600 text-sm w-full md:w-1/2">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              Our Store
            </h3>
            <p className="text-gray-500 leading-relaxed">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
          </div>
          <div>
            <p className="text-gray-500 leading-relaxed">
              <span className="font-medium text-gray-700">Tel:</span> (415)
              555-0132 <br />
              <span className="font-medium text-gray-700">Email:</span>{" "}
              admin@forever.com
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              Careers at Forever
            </h3>
            <p className="text-gray-500 leading-relaxed">
              Learn more about our teams and explore exciting job opportunities.
            </p>
          </div>
          <button className="mt-2 w-fit border cursor-pointer border-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition-all duration-300 rounded-full">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}

export default Contact;
