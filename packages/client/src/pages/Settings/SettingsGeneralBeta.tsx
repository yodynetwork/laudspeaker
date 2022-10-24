/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import Header from "components/Header";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3BottomLeftIcon,
  BellIcon,
  BriefcaseIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CogIcon,
  DocumentMagnifyingGlassIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  MagnifyingGlassIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import LaudspeakerIcon from "../../assets/images/laudspeakerIcon.svg";
import SaveSettings from "components/SaveSettings";
import ApiService from "services/api.service";
import { ApiConfig } from "../../constants";
import { Input } from "components/Elements";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: false },
  { name: "Jobs", href: "#", icon: BriefcaseIcon, current: false },
  {
    name: "Applications",
    href: "#",
    icon: DocumentMagnifyingGlassIcon,
    current: false,
  },
  {
    name: "Messages",
    href: "#",
    icon: ChatBubbleOvalLeftEllipsisIcon,
    current: false,
  },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Settings", href: "#", icon: CogIcon, current: true },
];
const secondaryNavigation = [
  { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
  { name: "Logout", href: "#", icon: ArrowLeftOnRectangleIcon },
];
const tabs = [
  { name: "Account", href: "", current: true },
  { name: "API", href: "/beta/settings/api", current: false },
  { name: "Email", href: "/beta/settings/email", current: false },
  { name: "SMS", href: "/beta/settings/sms", current: false },
  { name: "Slack", href: "/beta/settings/slack", current: false },
  { name: "Events", href: "/beta/settings/events", current: false },
  { name: "Plan", href: "/beta/settings/plan", current: false },
  { name: "Billing", href: "/beta/settings/billing", current: false },
  { name: "Team Members", href: "/beta/settings/team", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SettingsGeneralBeta() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    verifyNewPassword: "",
  });

  const errors: { [key: string]: string[] } = {
    firstName: [],
    lastName: [],
    email: [],
    currentPassword: [],
    newPassword: [],
    verifyNewPassword: [],
  };

  if (formData.firstName.length === 0)
    errors.firstName.push("First name should be defined");

  if (formData.lastName.length === 0)
    errors.lastName.push("Last name should be defined");

  if (formData.email.length === 0) errors.email.push("Email should be defined");

  if (!formData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    errors.email.push("Email should be valid");
  const handleFormDataChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    (async () => {
      const { data } = await ApiService.get({ url: "/accounts" });
      const { firstName, lastName, email } = data;
      setFormData({ ...formData, firstName, lastName, email });
    })();
  }, []);

  const handleSubmit = async () => {
    await ApiService.patch({
      url: "/accounts",
      options: {
        ...formData,
        currentPassword: formData.currentPassword || undefined,
        newPassword: formData.newPassword || undefined,
        verifyNewPassword: formData.verifyNewPassword || undefined,
      },
    });
  };

  return (
    <>
      {/*
        This example requires updating your template:
        ```
        <html class="h-fullimport Toggle from "components/Toggle";
 bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-14 p-1">
                      <button
                        type="button"
                        className="flex h-12 w-12 items-center justify-center rounded-full focus:bg-gray-600 focus:outline-none"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Close sidebar</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    {/*src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=600"*/}
                    <img
                      className="h-8 w-auto"
                      src={LaudspeakerIcon}
                      alt="Easywire"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="flex h-full flex-col">
                      <div className="space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-purple-50 border-purple-600 text-purple-600"
                                : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group border-l-4 py-2 px-3 flex items-center text-base font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-purple-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-4 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <div className="mt-auto space-y-1 pt-10">
                        {secondaryNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="group flex items-center border-l-4 border-transparent py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          >
                            <item.icon
                              className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <nav className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-gray-50 pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-8 w-auto"
                src={LaudspeakerIcon}
                alt="Easywire"
              />
            </div>
            <div className="mt-5 flex-grow">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-purple-50 border-purple-600 text-purple-600"
                        : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                      "group border-l-4 py-2 px-3 flex items-center text-sm font-medium"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-purple-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="block w-full flex-shrink-0">
              {secondaryNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center border-l-4 border-transparent py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <item.icon
                    className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Content area */}
        <div className="md:pl-64">
          <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
            <Header handleSidebarOpen={() => setSidebarOpen(true)} />
            <main className="flex-1">
              <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0">
                <div className="pt-10 pb-16">
                  <div className="px-4 sm:px-6 md:px-0">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                      Settings
                    </h1>
                  </div>
                  <div className="px-4 sm:px-6 md:px-0">
                    <div className="py-6">
                      <div className="lg:hidden">
                        <label htmlFor="selected-tab" className="sr-only">
                          Select a tab
                        </label>
                        <select
                          id="selected-tab"
                          name="selected-tab"
                          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                          defaultValue={tabs.find((tab) => tab.current)?.name}
                        >
                          {tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="hidden lg:block">
                        <div className="border-b border-gray-200">
                          <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                              <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                  tab.current
                                    ? "border-purple-500 text-purple-600"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                )}
                              >
                                {tab.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>

                      {/* Description list with inline editing */}
                      <div className="mt-10 divide-y divide-gray-200">
                        <div className="space-y-1">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Profile and Security
                          </h3>
                          <p className="max-w-2xl text-sm text-gray-500">
                            Keep your information up to date.
                          </p>
                        </div>
                        <div className="mt-6">
                          <dl className="divide-y divide-gray-200">
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                First Name
                              </dt>
                              <dd className="relative">
                                <Input
                                  type="text"
                                  value={formData.firstName}
                                  onChange={handleFormDataChange}
                                  name="firstName"
                                  id="firstName"
                                  placeholder="Mahamad"
                                  className={classNames(
                                    errors.firstName.length > 0
                                      ? "rounded-md sm:text-sm focus:!border-red-500 !border-red-300 shadow-sm focus:!ring-red-500 "
                                      : "rounded-md sm:text-sm focus:border-purple-500 border-gray-300 shadow-sm focus:ring-purple-500 "
                                  )}
                                />
                                {errors.firstName.length > 0 && (
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                    <ExclamationCircleIcon
                                      className="h-5 w-5 text-red-500"
                                      aria-hidden="true"
                                    />
                                  </div>
                                )}
                              </dd>
                              {errors.firstName.map((item) => (
                                <p
                                  className="mt-2 text-sm text-red-600"
                                  id="email-error"
                                  key={item}
                                >
                                  {item}
                                </p>
                              ))}
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                Last Name
                              </dt>
                              <dd className="relative">
                                <Input
                                  type="text"
                                  value={formData.lastName}
                                  onChange={handleFormDataChange}
                                  name="lastName"
                                  id="lastName"
                                  placeholder="Charawi"
                                  className={classNames(
                                    errors.lastName.length > 0
                                      ? "rounded-md sm:text-sm focus:!border-red-500 !border-red-300 shadow-sm focus:!ring-red-500 "
                                      : "rounded-md sm:text-sm focus:border-purple-500 border-gray-300 shadow-sm focus:ring-purple-500 "
                                  )}
                                />
                                {errors.lastName.length > 0 && (
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                    <ExclamationCircleIcon
                                      className="h-5 w-5 text-red-500"
                                      aria-hidden="true"
                                    />
                                  </div>
                                )}
                              </dd>
                              {errors.lastName.map((item) => (
                                <p
                                  className="mt-2 text-sm text-red-600"
                                  id="email-error"
                                  key={item}
                                >
                                  {item}
                                </p>
                              ))}
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                Email
                              </dt>
                              <dd className="relative">
                                <Input
                                  type="email"
                                  value={formData.email}
                                  onChange={handleFormDataChange}
                                  name="email"
                                  id="email"
                                  placeholder="you@example.com"
                                  className={classNames(
                                    errors.email.length > 0
                                      ? "rounded-md sm:text-sm focus:!border-red-500 !border-red-300 shadow-sm focus:!ring-red-500 "
                                      : "rounded-md sm:text-sm focus:border-purple-500 border-gray-300 shadow-sm focus:ring-purple-500 "
                                  )}
                                />
                                {errors.email.length > 0 && (
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                    <ExclamationCircleIcon
                                      className="h-5 w-5 text-red-500"
                                      aria-hidden="true"
                                    />
                                  </div>
                                )}
                              </dd>
                              {errors.email.map((item) => (
                                <p
                                  className="mt-2 text-sm text-red-600"
                                  id="email-error"
                                  key={item}
                                >
                                  {item}
                                </p>
                              ))}
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                Current Password
                              </dt>
                              <dd>
                                <div className="relative rounded-md ">
                                  <Input
                                    type="password"
                                    value={formData.currentPassword}
                                    onChange={handleFormDataChange}
                                    name="currentPassword"
                                    id="currentPassword"
                                    className={classNames(
                                      errors.currentPassword.length > 0
                                        ? "rounded-md sm:text-sm focus:!border-red-500 !border-red-300 shadow-sm focus:!ring-red-500 "
                                        : "rounded-md sm:text-sm focus:border-purple-500 border-gray-300 shadow-sm focus:ring-purple-500 "
                                    )}
                                    aria-invalid="true"
                                    aria-describedby="password-error"
                                  />
                                  {errors.currentPassword.length > 0 && (
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                      <ExclamationCircleIcon
                                        className="h-5 w-5 text-red-500"
                                        aria-hidden="true"
                                      />
                                    </div>
                                  )}
                                </div>
                                {errors.currentPassword.map((item) => (
                                  <p
                                    className="mt-2 text-sm text-red-600"
                                    id="email-error"
                                    key={item}
                                  >
                                    {item}
                                  </p>
                                ))}
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                New Password
                              </dt>
                              <dd>
                                <div className="relative rounded-md ">
                                  <Input
                                    type="password"
                                    value={formData.newPassword}
                                    onChange={handleFormDataChange}
                                    name="newPassword"
                                    id="newPassword"
                                    className={classNames(
                                      errors.newPassword.length > 0
                                        ? "rounded-md sm:text-sm focus:!border-red-500 !border-red-300 shadow-sm focus:!ring-red-500 "
                                        : "rounded-md sm:text-sm focus:border-purple-500 border-gray-300 shadow-sm focus:ring-purple-500 "
                                    )}
                                    aria-invalid="true"
                                    aria-describedby="password-error"
                                  />
                                  {errors.newPassword.length > 0 && (
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                      <ExclamationCircleIcon
                                        className="h-5 w-5 text-red-500"
                                        aria-hidden="true"
                                      />
                                    </div>
                                  )}
                                </div>
                                {errors.newPassword.map((item) => (
                                  <p
                                    className="mt-2 text-sm text-red-600"
                                    id="email-error"
                                    key={item}
                                  >
                                    {item}
                                  </p>
                                ))}
                              </dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                Verify New Password
                              </dt>
                              <dd>
                                <div className="relative rounded-md ">
                                  <Input
                                    type="password"
                                    value={formData.verifyNewPassword}
                                    onChange={handleFormDataChange}
                                    name="verifyNewPassword"
                                    id="verifyNewPassword"
                                    className={classNames(
                                      errors.verifyNewPassword.length > 0
                                        ? "rounded-md sm:text-sm focus:!border-red-500 !border-red-300 shadow-sm focus:!ring-red-500 "
                                        : "rounded-md sm:text-sm focus:border-purple-500 border-gray-300 shadow-sm focus:ring-purple-500 "
                                    )}
                                    aria-invalid="true"
                                    aria-describedby="password-error"
                                  />
                                  {errors.verifyNewPassword.length > 0 && (
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                      <ExclamationCircleIcon
                                        className="h-5 w-5 text-red-500"
                                        aria-hidden="true"
                                      />
                                    </div>
                                  )}
                                </div>
                                {errors.verifyNewPassword.map((item) => (
                                  <p
                                    className="mt-2 text-sm text-red-600"
                                    id="email-error"
                                    key={item}
                                  >
                                    {item}
                                  </p>
                                ))}
                              </dd>
                            </div>
                            <SaveSettings onClick={handleSubmit} />
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
