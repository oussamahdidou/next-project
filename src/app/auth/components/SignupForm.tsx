"use client";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/form.module.css";
import { useState } from "react";
import { useFormik } from "formik";
import { registerValidate } from "../lib/validate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faAt,
  faFingerprint,
  faGift,
  faHouse,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const [currentStep, setCurrentStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
      cin: "",
      dateofbirth: "",
      phoneNumber: "",
      address: "",
    },
    validate: registerValidate,
    onSubmit,
  });

  async function onSubmit(values: any) {
    console.log(values);
  }

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSkip = () => {
    setSkippedSteps([...skippedSteps, currentStep]);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const steps = ["Basic Information", "Driver Information", "Owner Information"];

  const renderStepForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <h4> Basic information </h4>
          <form className="flex flex-row gap-5">
            <div className="name flex flex-col w-full md:w-1/2 gap-10">
              <div className={styles.input_group}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className={styles.input_text}
                  {...formik.getFieldProps("username")}
                />
                <span className="icon flex items-center px-4">
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
              {formik.errors.username && formik.touched.username ? (
                <span className="text-rose-500">{formik.errors.username}</span>
              ) : (
                <></>
              )}

              <div className={styles.input_group}>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className={styles.input_text}
                  {...formik.getFieldProps("email")}
                />
                <span className="icon flex items-center px-4">
                  <FontAwesomeIcon icon={faAt} />
                </span>
              </div>
              {formik.errors.email && formik.touched.email ? (
                <span className="text-rose-500">{formik.errors.email}</span>
              ) : (
                <></>
              )}

              <div className={styles.input_group}>
                <input
                  type={show.password ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={styles.input_text}
                  {...formik.getFieldProps("password")}
                />
                <span
                  className="icon flex items-center px-4"
                  onClick={() => setShow({ ...show, password: !show.password })}
                >
                  <FontAwesomeIcon icon={faFingerprint} />
                </span>
              </div>
              {formik.errors.password && formik.touched.password ? (
                <span className="text-rose-500">{formik.errors.password}</span>
              ) : (
                <></>
              )}

              <div className={styles.input_group}>
                <input
                  type={show.cpassword ? "text" : "password"}
                  name="cpassword"
                  placeholder="Confirm password"
                  className={styles.input_text}
                  {...formik.getFieldProps("cpassword")}
                />
                <span
                  className="icon flex items-center px-4"
                  onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
                >
                  <FontAwesomeIcon icon={faFingerprint} />
                </span>
              </div>
              {formik.errors.cpassword && formik.touched.cpassword ? (
                <span className="text-rose-500">{formik.errors.cpassword}</span>
              ) : (
                <></>
              )}
            </div>

            <div className="name flex flex-col w-full md:w-1/2 gap-10">
              <div className={styles.input_group}>
                <input
                  type="text"
                  name="cin"
                  placeholder="CIN"
                  className={styles.input_text}
                  {...formik.getFieldProps("cin")}
                />
                <span className="icon flex items-center px-4">
                  <FontAwesomeIcon icon={faAddressCard} />
                </span>
              </div>

              <div className={styles.input_group}>
                <input
                  type="text"
                  name="dateofbirth"
                  placeholder="Date of Birth"
                  className={styles.input_text}
                  {...formik.getFieldProps("dateofbirth")}
                />
                <span className="icon flex items-center px-4">
                  <FontAwesomeIcon icon={faGift} />
                </span>
              </div>

              <div className={styles.input_group}>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className={styles.input_text}
                  {...formik.getFieldProps("phoneNumber")}
                />
                <span className="icon flex items-center px-4">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
              </div>

              <div className={styles.input_group}>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className={styles.input_text}
                  {...formik.getFieldProps("address")}
                />
                <span className="icon flex items-center px-4">
                  <FontAwesomeIcon icon={faHouse} />
                </span>
              </div>
            </div>
          </form>
        );

      case 1:
        return (
          <h4> Driver information </h4>
          
        );

      case 2:
        return (
          
          <h4> Owner information </h4>
        );

      default:
        return null;
    }
  };
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className=" text-gray-800 text-4xl font-bold py-4"> Register</h1>
          <p className="w-3/4 mx-auto text-gray-400 flex-col gap-10">
            {" "}
            Create your account and start your journey with us{" "}
          </p>
          {renderStepForm()}
        </div>
            <div className="flex justify-between mt-4">
          {currentStep > 0 && (
            <button type="button" onClick={handleBack} className="text-orange-600">
              Previous
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button type="button" onClick={handleNext} className="text-orange-600">
              Next
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button type="button" onClick={handleSkip} className="text-orange-600">
              Skip
            </button>
          )}

          </div>
        </form>

        {/* Submit button and Sign In link */}
        <div className="input-button">
          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </div>
        <p className="text-center text-gray-400">
          Have an account ?
          <Link href={"/login"}>
            <p className="text-orange-600">Sign In</p>
          </Link>
        </p>
      </section>
    </>
  );
}