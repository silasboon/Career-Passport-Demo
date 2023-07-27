"use client";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
	user: any;
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar({ user }: NavbarProps) {
	const router = useRouter();

	// Control modal
	const signIn = () => {
		return;
	};

	const loggedInMenu = () => {
		return (
			<>
				<Menu.Item>
					{({ active }) => (
						<p
							className={classNames(
								active ? "bg-gray-100" : "",
								"block px-4 py-2 text-sm text-gray-700"
							)}
						>
							{user.first_name} {user.last_name}
						</p>
					)}
				</Menu.Item>
				<Menu.Item>
					{({ active }) => (
						<Link
							href="/profile"
							className={classNames(
								active ? "bg-gray-100" : "",
								"block px-4 py-2 text-sm text-gray-700"
							)}
						>
							Profile
						</Link>
					)}
				</Menu.Item>
				<Menu.Item>
					{({ active }) => (
						<Link
							href="/admin-dashboard"
							className={classNames(
								active ? "bg-gray-100" : "",
								"block px-4 py-2 text-sm text-gray-700"
							)}
						>
							Administrator Dashboard
						</Link>
					)}
				</Menu.Item>
				<Menu.Item>
					{({ active }) => (
						<a
							href="#"
							onClick={signIn}
							className={classNames(
								active ? "bg-gray-100" : "",
								"block px-4 py-2 text-sm text-gray-700"
							)}
						>
							Sign out
						</a>
					)}
				</Menu.Item>
			</>
		);
	};

	const loggedOutMenu = () => {
		return (
			<>
				<Menu.Item>
					{({ active }) => (
						<a
							href="/profile"
							onClick={signIn}
							className={classNames(
								active ? "bg-gray-100" : "",
								"block px-4 py-2 text-sm text-gray-700"
							)}
						>
							Login
						</a>
					)}
				</Menu.Item>
				<Menu.Item>
					{({ active }) => (
						<a
							href="#"
							onClick={signIn}
							className={classNames(
								active ? "bg-gray-100" : "",
								"block px-4 py-2 text-sm text-gray-700"
							)}
						>
							Sign Up
						</a>
					)}
				</Menu.Item>
			</>
		);
	};

	const notificationMenu = () => {
		return (
			<Menu.Item>
				{({ active }) => (
					<p
						className={classNames(
							active ? "bg-gray-100" : "",
							"block px-4 py-2 text-sm text-gray-700"
						)}
					>
						No Notifications
					</p>
				)}
			</Menu.Item>
		);
	};

	return (
		<Disclosure as="nav" className="bg-gray-800">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex flex-shrink-0 items-center">
									<Link href="/">
										{/* <img
											className="block h-8 w-auto lg:hidden"
											src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
											alt="Your Company"
										/> */}
										<Image
											src="/VIU_logo.svg"
											width={100}
											height={100}
											alt="logo"
											className="block h-12 w-auto lg:hidden"
										/>
										{/* <img
											className="hidden h-8 w-auto lg:block"
											src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
											alt="Your Company"
										/> */}
										<Image
											src="/VIU_logo.svg"
											width={100}
											height={100}
											alt="logo"
											className="hidden h-12 w-auto lg:block"
										/>
									</Link>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">{/* Nav Items go here*/}</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								{user ? (
									<>
										<Menu as="div" className="relative ml-3">
											<div>
												<Menu.Button className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none ">
													<span className="sr-only">View notifications</span>
													<BellIcon className="h-6 w-6" aria-hidden="true" />
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95"
											>
												<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
													{notificationMenu()}
												</Menu.Items>
											</Transition>
										</Menu>
									</>
								) : null}

								{/* Profile dropdown */}
								<Menu as="div" className="relative ml-3">
									<div>
										<Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
											<span className="sr-only">Open user menu</span>
											<img
												className="h-8 w-8 rounded-full"
												src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
												alt=""
											/>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											{user ? <>{loggedInMenu()}</> : <>{loggedOutMenu()}</>}
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>
				</>
			)}
		</Disclosure>
	);
}
