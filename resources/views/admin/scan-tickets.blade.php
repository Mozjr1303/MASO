@extends('layouts.admin-layout')

@section('title', 'Maso Awards - Scan Tickets')

@section('main-content')
    <div class="main_content_iner ">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-12">
                    <div class="QA_section">
                        <div class="white_box_tittle list_header">
                            <h4>Tickets</h4>
                            <div class="box_right d-flex lms_block">
                                <div class="add_button ms-2">
                                    <a href="{{ route('admin.ticket-dashboard') }}" class="btn_1"><i class="fa fa-tachometer-alt"></i>
                                        Metrics</a>
                                    <a href="{{ route('admin.approved-tickets') }}" class="btn_1"><i class="fa fa-ticket-alt"></i>
                                        Tickets</a>
                                </div>
                            </div>
                        </div>
                        <div class="white_box mb-3">
                            <select id="ticketType" class="form-control mb-4">
                                <option value="" disabled selected>Ticket Category</option>
                                <option value="online">Online Ticket</option>
                                <option value="physical">Physical Ticket</option>
                            </select>
                            <div id="reader"></div>

                            <div class="ticket-details" style="display:none;">
                                <div class="ticket-row">
                                    <span class="ticket-label">Full Name:</span>
                                    <span class="ticket-value" id="name"></span>
                                </div>
                                <div class="ticket-row">
                                    <span class="ticket-label">Mobile:</span>
                                    <span class="ticket-value" id="mobile"></span>
                                </div>
                                <div class="ticket-row">
                                    <span class="ticket-label">Ticket Type:</span>
                                    <span class="ticket-value" id="type"></span>
                                </div>
                                <div class="ticket-row">
                                    <span class="ticket-label">Ticket ID:</span>
                                    <span class="ticket-value" id="ticket_id"></span>
                                </div>
                                <div class="ticket-row">
                                    <span class="ticket-label">Date:</span>
                                    <span class="ticket-value" id="date"></span>
                                </div>
                                <div class="ticket-row">
                                    <span class="ticket-label">Status:</span>
                                    <span class="ticket-value" id="status"></span>
                                </div>
                                <input type="hidden" id="ticketCategory" value="">
                                <button class="ticket-button" onclick="approveTicket()">Approve</button>
                            </div>

                            <div class="d-flex justify-content-center mt-3">
                                <button class="form-btn" id="clear" style="display:none"><i class="fa fa-times"></i>
                                    Clear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        let ticketType = document.getElementById("ticketType");
        ticketType.addEventListener("change", () => {
            console.log(ticketType.value);
        });

        let ticketDetails = document.querySelector('.ticket-details');

        const scanner = new Html5QrcodeScanner('reader', {
            // Scanner will be initialized in DOM inside element with id of 'reader'
            qrbox: {
                width: 150,
                height: 150,
            }, // Sets dimensions of scanning box (set relative to reader element width)
            fps: 20, // Frames per second to attempt a scan
        });

        scanner.render(success, error);
        // Starts scanner

        function success(result) {
            if (ticketType.value == "") {
                notyf.error("Please select ticket category");
                return
            }

            // console.log("Scanned result: " + result);
            fetch(`/admin/tickets/check-qr-code/${result}/${ticketType.value}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((response) => {
                    let name = document.getElementById('name');
                    let mobile = document.getElementById('mobile');
                    let type = document.getElementById('type');
                    let ticket_id = document.getElementById('ticket_id');
                    let date = document.getElementById('date');
                    let status = document.getElementById('status');
                    let ticketCategory = document.getElementById('ticketCategory');
                    const clear = document.getElementById('clear');

                    clear.style.display = 'block';
                    console.log(response)
                    if (response.status == 'error') {
                        notyf.error(response.message);
                    } else {
                        name.innerHTML = response.data.name;
                        mobile.innerHTML = response.data.mobile;
                        type.innerHTML = response.data.ticket_type;
                        ticket_id.innerHTML = response.data.unique_id;
                        date.innerHTML = response.data.created_at;
                        ticketCategory.value = response.category;

                        status.innerHTML = 'Not Approved';

                        ticketDetails.style.display = 'flex';
                        document.getElementById('reader').style.display = 'none';
                        scanner.clear(); // Clears scanning instance
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

        clear.addEventListener('click', () => {
            ticketDetails.style.display = 'none';
            scanner.render(success, error); // Starts scanner
            document.getElementById('reader').style.display = 'block';
            clear.style.display = 'none';
        });

        function error(err) {
            console.error(err);
            // Prints any errors to the console
        }

        function approveTicket() {
            const ticketId = document.getElementById('ticket_id').innerText;
            const ticketCategory = document.getElementById('ticketCategory').value;

            fetch('/admin/tickets/approve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                },
                body: JSON.stringify({ ticket_id: ticketId, category: ticketCategory })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    notyf.success(data.message);
                    document.getElementById('status').innerText = 'Approved';
                } else {
                    notyf.error(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                notyf.error('An error occurred while approving the ticket.');
            });
        }
    </script>
@endsection

@section('active-page')
    <script>
        document.querySelector("#sidebar_menu .scan").classList.add("mm-active");
    </script>
@endsection
