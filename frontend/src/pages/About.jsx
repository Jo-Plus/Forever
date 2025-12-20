import React from "react";
import Title from "../components/Title.jsx";
import { assets } from "../assets/assets.js";
import NewsLetterBox from "../components/NewsLetterBox.jsx";

function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center text-3xl pt-10 border-t mt-[70px] border-gray-200">
        <Title text1={"ABOUT"} text2={"US"} />
        <p className="mt-3 text-gray-500 text-sm max-w-xl mx-auto">Learn more about who we are and what drives us forward</p>
      </div>
      <div className="flex my-16 flex-col lg:flex-row gap-14 items-center">
        <img src={assets.about_img} alt="about_img" className="w-full lg:max-w-[480px] rounded-2xl shadow-lg object-cover" />
        <div className="flex flex-col gap-6 lg:w-2/4 text-gray-600 text-sm leading-relaxed">
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to create a platform where shopping feels effortless.</p>
          <p>Since our inception, we've curated a diverse selection of premium products that cater to every taste — from fashion and beauty to home essentials and electronics.</p>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Our Mission
            </h3>
            <p>
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence — delivering a seamless experience
              from discovery to delivery.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center text-3xl py-10">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <div className="border border-gray-200 rounded-xl px-8 py-10 flex flex-col gap-4 hover:shadow-lg transition-all">
          <b className="text-gray-900">Quality Assurance</b>
          <p className="text-gray-600 text-sm">
            Every product is carefully selected and quality-checked to ensure
            it meets our high standards.
          </p>
        </div>
        <div className="border border-gray-200 rounded-xl px-8 py-10 flex flex-col gap-4 hover:shadow-lg transition-all">
          <b className="text-gray-900">Convenience</b>
          <p className="text-gray-600 text-sm">
            A smooth browsing experience and hassle-free checkout designed with
            you in mind.
          </p>
        </div>
        <div className="border border-gray-200 rounded-xl px-8 py-10 flex flex-col gap-4 hover:shadow-lg transition-all">
          <b className="text-gray-900">Customer Support</b>
          <p className="text-gray-600 text-sm">
            Our dedicated support team is always available to assist you at
            every step.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
}

export default About;
