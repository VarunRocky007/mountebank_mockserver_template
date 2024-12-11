"use client";
import { useState } from "react";
import styles from "./UsersSection.module.css";
import { CircularProgress, Dialog, DialogTitle } from "@mui/material";
import UserDetail from "@/app/components/UserDetail";

export default function UsersSection({
  createUserWithAPIMap,
  showSelectedMappings,
}) {
  const [loading, setLoading] = useState(false);
  const [mapping, setMapping] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [showApiMappingLoading, setShowApiMappingLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [uniqueIdentifier, setUniqueIdentifier] = useState("");

  async function createUser() {
    setLoading(true);
    const user = await createUserWithAPIMap();
    setLoading(false);
    console.log(user);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setMobileNumber(user.mobile);
    setUniqueIdentifier(user.uniqueIdentifier);
  }

  async function showApiMappings() {
    setShowApiMappingLoading(true);
    const mappings = await showSelectedMappings();
    setShowApiMappingLoading(false);
    setMapping(mappings);
    setShowDialog(true);
  }

  function closeDialog() {
    setShowDialog(false);
  }

  return (
    <div className={styles.userSection}>
      <Dialog
        open={showDialog}
        fullWidth={true}
        maxWidth="lg"
        onClose={closeDialog}
      >
        <DialogTitle>API Mappings</DialogTitle>
        {mapping}
      </Dialog>
      <div className={styles.usersTitle}>
        Users{" "}
        {loading === false && (
          <button className={styles.addButton} onClick={(e) => createUser()}>
            <span>+</span>
          </button>
        )}
        {loading === true && (
          <span className={styles.loader}>
            <CircularProgress color="#ffffff" />
          </span>
        )}{" "}
        <button
          className={styles.showMappingsButton}
          onClick={(e) => showApiMappings()}
        >
          Show Api Mappings
        </button>
      </div>
      <div className={styles.usersContent}>
        {firstName !== null && (
          <UserDetail label={"FirstName"} value={firstName} />
        )}
        {lastName !== null && (
          <UserDetail label={"LastName"} value={lastName} />
        )}
        {email !== null && <UserDetail label={"Email"} value={email} />}
        {mobileNumber !== null && (
          <UserDetail label={"MobileNumber"} value={mobileNumber} />
        )}
        {uniqueIdentifier !== null && <UserDetail label={"UniqueIdentifier"} value={uniqueIdentifier} />}
      </div>
    </div>
  );
}
