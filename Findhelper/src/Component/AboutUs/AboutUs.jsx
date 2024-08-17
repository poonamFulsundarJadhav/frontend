import React from 'react';

function AboutUs() {
  return (
    <div>
      <div className="py-16 bg-white">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="md:w-5/12 lg:w-5/12">
              <img
                src="https://img.freepik.com/free-photo/people-with-laptops-office_23-2147656717.jpg?t=st=1722970596~exp=1722974196~hmac=2fcc2e1b72037a58ae657f5114e4798fe3edba8f72439201be74ad3e6cdc76c6&w=1060"
                alt="FindHelper Team"
                className="rounded-[20px] shadow-lg shadow-blue-500/50"
              />
            </div>
            <div className="md:w-7/12 lg:w-6/12">
              <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                Welcome to FindHelper – Your Trusted Partner for Home Services
              </h2>
              <p className="mt-6 text-gray-600">
                At FindHelper, our mission is to connect you with reliable, skilled professionals who can handle any household task with efficiency and expertise. Whether you need an electrician, plumber, doctor, cook, or any other home service, we've got you covered.
              </p>
              <p className="mt-4 text-gray-600">
                We understand that finding the right service provider can be challenging. That's why we've made it our priority to bring you the best in the business. Our team carefully vets and selects each professional to ensure they meet our high standards of quality, reliability, and trustworthiness.
              </p>
              <p className="mt-4 text-gray-600">
                FindHelper is committed to making your life easier by offering a one-stop solution for all your home service needs. From routine maintenance to urgent repairs, and from health services to culinary assistance, we are here to help you manage your home effortlessly.
              </p>
              <p className="mt-4 text-gray-600">
                Our core values are centered around customer satisfaction, integrity, and excellence. We believe in building long-term relationships with our clients by consistently delivering outstanding service. When you choose FindHelper, you're choosing a company that puts your needs first.
              </p>
              <p className="mt-4 text-gray-600">
                Let FindHelper take the stress out of finding the right help for your home. Discover the difference of working with professionals who care about your comfort and peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
