"use client";
import {signIn} from "next-auth/react"
import Button from "../Button";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Modal from "./modals";
import Heading from "../Heading";
import Input from "../inputs/Input";
import {FieldValues,SubmitHandler, useForm} from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import toast from "react-hot-toast";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";
import { useCallback } from "react";



const loginModal = () => {
    const router =  useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            
            name: "" ,
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log("Form Data Submitted:", data);
        setIsLoading(true);
        signIn('credentials', { 
            email: data.email, 
            password: data.password,
            redirect: false 
        }) 
        .then((callback) => { 
            setIsLoading(false); 
            if (callback?.ok) { 
                toast.success('Logged in'); 
                router.refresh(); 
                loginModal.onClose(); 
            } 
            if (callback?.error) { 
                toast.error(callback.error); 
            } 
        });
    };

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
      }, [loginModal, registerModal]);
      

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Login to your account!" />

            <Input
                id="email"
                label="email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />


        </div>
    );
    const footerContent = (
        <div className="flex flex-col gap-4 mt-3 mb-[325px] md:mb-0">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={()=>signIn("google")}
            />
            <Button
                outline
                label="Continue With Github"
                icon={AiFillGithub}
                onClick={()=>signIn('github')}
            />
            <div className="text-neutral-500 text-center mt-4 font-light gap-2 items-center justify-center">
                <div className="flex flex-row justify-center">
                    <div>First time using Airbnb?</div>
                    <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">Create an account</div>
                </div>
            </div>
        </div>
    );


    return (


        <Modal
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />

    );
};

export default loginModal;
