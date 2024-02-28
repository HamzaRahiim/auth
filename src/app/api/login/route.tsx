import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const jwtExpirationTime = 60; // Token expiration time in seconds
    const user = await request.json();
    if (user.userName == "Hamza") {
      const secret = new TextEncoder().encode("sasdasfaHABSHecret");
      const alg = "HS256";
      const jwt = await new SignJWT({ userName: user.userName })
        .setProtectedHeader({ alg })
        .setExpirationTime(`${jwtExpirationTime}s`)
        .setIssuedAt()
        .sign(secret);

      const res = NextResponse.json({ jwt, success: true });
      res.cookies.set({
        name: "jwt",
        value: jwt,
        httpOnly: true,
      });
      return res;
    }
    return NextResponse.json({ success: false });
  } catch (error) {
    console.log("We got some error in api");
  }
};

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get("jwt");
  if (token) {
    const secret = new TextEncoder().encode("sasdasfaHABSHecret");
    const { payload, protectedHeader } = await jwtVerify(token?.value, secret);

    console.log(protectedHeader);
    console.log(payload);
    return NextResponse.json("Welcome");
  }
  return NextResponse.json("Please Login");
};
