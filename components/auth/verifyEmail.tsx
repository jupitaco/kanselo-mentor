"use client";

import { useGlobalHooks } from "@/hooks/globalHooks";
import React, { FormEvent, useRef, useState } from "react";
import Button from "../ui/button";
import CountDownTimer from "../ui/countDownTimer";
import { toast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

const numInput = [
  { id: "1", name: "num1" },
  { id: "2", name: "num2" },
  { id: "3", name: "num3" },
  { id: "4", name: "num4" },
];

const VerifyEmail = ({ routePath }: { routePath?: string }) => {
  const { push } = useRouter();

  const { loading, errors } = useGlobalHooks();
  const [timeLeft, setTimeLeft] = useState(60);

  const [verifyCode, setVerifyCode] = useState({
    num1: "",
    num2: "",
    num3: "",
    num4: "",
  });

  const inputRefs = useRef([
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
    React.createRef<HTMLInputElement>(),
  ]);

  const handleChange = (e: FormEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target as HTMLInputElement;
    setVerifyCode({ ...verifyCode, [`num${index + 1}`]: value });

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current?.focus();
    }
  };

  // const handleReSendOTP = async () => {
  //   setLoading(() => ({ ['resend']: true }));

  //   try {
  //     const rsp = await resendOTP(userData?.email);

  //     if (!rsp.ok) {
  //       handleError(
  //         'Re-send OTP',
  //         rsp?.body?.message || 'We encountered an error, please try again.',
  //       );
  //       return;
  //     } else {
  //       toast({
  //         variant: 'default',
  //         title: 'Success',
  //         description: rsp?.body?.message,
  //       });
  //     }

  //     setLoading(() => ({ ['resend']: false }));
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(() => ({ ['resend']: false }));
  //   }
  // };

  const handleSuccess = (message: string) => {
    if (routePath) {
      push(routePath);
    } else {
      push("/signup-success");
      toast({
        variant: "default",
        title: "Verify Email",
        description: message,
      });
    }
  };

  // const handleVerifyEmail = async () => {
  //   setLoading(() => ({ ['verify']: true }));

  //   if (Object.keys(verifyCode).some((code) => code === '')) {
  //     toast({
  //       title: 'Failed',
  //       variant: 'destructive',
  //       description: 'Enter the code sent to your email',
  //     });
  //     return;
  //   }

  //   const verificationCode = Object.values(verifyCode).join('');

  //   if (routePath) {
  //     setUserData((prev) => ({
  //       ...prev,
  //       code: verificationCode,
  //     }));
  //   }

  //   try {
  //     const rsp = await verifyEmailAction({
  //       email: userData?.email,
  //       uniqueVerificationCode: verificationCode,
  //     });

  //     if (rsp.error) {
  //       toast({
  //         variant: 'destructive',
  //         title: 'Failed',
  //         description: rsp?.message,
  //       });
  //       setLoading(() => ({ ['verify']: false }));
  //     } else {
  //       handleSuccess(rsp?.message || 'Email verification succesfull');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(() => ({ ['verify']: false }));
  //   } finally {
  //     setLoading(() => ({ ['verify']: false }));
  //   }
  // };

  // When delete is pressed it should delete backward and jump focus to current input
  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    // Detect if backspace or delete key is clicked, if yes and the current input value is empty, jump backward to next one if available
    if (e.key === "Backspace" && !e.currentTarget?.value && index > 0) {
      inputRefs.current[index - 1].current?.focus();
    }
  };

  // // Auto focus on component mount
  // useEffect(() => {
  //   inputRefs.current[0].current?.focus();
  // }, []);

  // useEffect(() => {
  //   if (
  //     verifyCode.num1 &&
  //     verifyCode.num2 &&
  //     verifyCode.num3 &&
  //     verifyCode.num4
  //   ) {
  //     handleVerifyEmail();
  //   }
  // }, [verifyCode]);

  return (
    <form
      // onSubmit={handleVerifyEmail}
      className="flex w-full flex-col justify-between"
    >
      <ul className={`flex w-full items-center gap-2`}>
        {numInput.map(({ id, name }, idx) => (
          <li className="flex items-center" key={id}>
            <input
              ref={inputRefs.current[idx]}
              id={id}
              type="password"
              name={name}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyPress(e, idx)}
              maxLength={1}
              defaultValue={verifyCode[name as keyof typeof verifyCode]}
              placeholder="0"
              className={`${
                errors.error && "errors animate__animated animate__shakeY"
              } form-controls h-[50px]! p-1! text-center`}
            />{" "}
          </li>
        ))}
      </ul>

      <article>
        <div className="mt-10">
          <Button
            link
            href="/onboarding"
            className="pry-btn w-full"
            type="button"
            // onClick={handleVerifyEmail}
            loading={loading["verify"]}
          >
            Continue
          </Button>
        </div>

        <div className="text-grey-500 mt-5 flex w-full items-center justify-center gap-1 text-center">
          <p
            // onClick={handleReSendOTP}
            className=""
          >
            Didn&apos;t receive a code?
          </p>
          {timeLeft > 0 ? (
            <CountDownTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
          ) : (
            <Button
              className="outline-btn text-sm!"
              type="button"
              // onClick={handleReSendOTP}
              loading={loading["resend"]}
            >
              Request again
            </Button>
          )}
        </div>
      </article>
    </form>
  );
};

export default VerifyEmail;
